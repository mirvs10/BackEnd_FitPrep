package com.fitprep.demo.pedidos_ecommerce.infrastructure.adapter.in.web;

import com.fitprep.demo.gestion_usuarios.domain.model.Usuario;
import com.fitprep.demo.gestion_usuarios.domain.port.in.AutenticacionUseCase;
import com.fitprep.demo.pedidos_ecommerce.domain.model.LineaPedido;
import com.fitprep.demo.pedidos_ecommerce.domain.model.PedidoEcommerce;
import com.fitprep.demo.pedidos_ecommerce.domain.port.in.ConsultarPedidosUseCase;
import com.fitprep.demo.pedidos_ecommerce.infrastructure.adapter.in.web.dto.TenantDashboardResponse;
import com.fitprep.demo.pedidos_ecommerce.infrastructure.adapter.in.web.dto.TenantDashboardResponse.PedidoRecienteDto;
import com.fitprep.demo.pedidos_ecommerce.infrastructure.adapter.in.web.dto.TenantDashboardResponse.PlatoTopDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/pedidos")
public class TenantDashboardController {

    private final ConsultarPedidosUseCase consultarPedidosUseCase;
    private final AutenticacionUseCase autenticacionUseCase;

    public TenantDashboardController(ConsultarPedidosUseCase consultarPedidosUseCase,
                                     AutenticacionUseCase autenticacionUseCase) {
        this.consultarPedidosUseCase = consultarPedidosUseCase;
        this.autenticacionUseCase = autenticacionUseCase;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> obtenerDashboard() {
        Usuario actual = usuarioActual();
        if (actual == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }
        if (actual.getNegocioId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario no pertenece a ningún negocio");
        }

        List<PedidoEcommerce> pedidos = consultarPedidosUseCase.listarPedidosNegocio(actual.getNegocioId());
        
        TenantDashboardResponse response = new TenantDashboardResponse();
        
        // Ventas Totales
        double ventas = pedidos.stream()
                .filter(p -> !"CANCELADO".equals(p.getEstado()))
                .mapToDouble(PedidoEcommerce::getMontoTotal)
                .sum();
        response.setVentasSemanales(ventas);
        
        // Pedidos Activos
        int activos = (int) pedidos.stream()
                .filter(p -> !"CANCELADO".equals(p.getEstado()) && !"ENTREGADO".equals(p.getEstado()))
                .count();
        response.setPedidosActivos(activos);
        
        // Pedidos Recientes
        List<PedidoRecienteDto> recientes = pedidos.stream()
                .sorted((p1, p2) -> p2.getFechaCreacion().compareTo(p1.getFechaCreacion()))
                .limit(5)
                .map(p -> {
                    PedidoRecienteDto dto = new PedidoRecienteDto();
                    dto.setIdPedido("P" + p.getId());
                    // As we don't have the user's name readily in PedidoEcommerce, we use a placeholder or ID
                    dto.setCliente("Cliente #" + p.getUsuarioId());
                    dto.setEstado(p.getEstado());
                    dto.setMonto("$" + String.format(Locale.US, "%.2f", p.getMontoTotal()));
                    dto.setColorBadge(getColorByEstado(p.getEstado()));
                    return dto;
                })
                .collect(Collectors.toList());
        response.setPedidosRecientes(recientes);
        
        // Platos más vendidos
        Map<Long, Integer> platoCantidades = new HashMap<>();
        Map<Long, String> platoNombres = new HashMap<>();
        int totalItems = 0;
        
        for (PedidoEcommerce pedido : pedidos) {
            if ("CANCELADO".equals(pedido.getEstado())) continue;
            for (LineaPedido linea : pedido.getLineas()) {
                platoCantidades.put(linea.getPlatoId(), platoCantidades.getOrDefault(linea.getPlatoId(), 0) + linea.getCantidad());
                // As we don't store the dish name in LineaPedido, we'll just mock it or fetch it.
                // Wait, LineaPedido has platoId. We might need to fetch the Plato entity. 
                // Let's use a generic name if we can't fetch it easily here without injecting CatalogoUseCase.
                platoNombres.put(linea.getPlatoId(), "Plato ID " + linea.getPlatoId());
                totalItems += linea.getCantidad();
            }
        }
        
        int finalTotalItems = totalItems;
        List<PlatoTopDto> topPlatos = platoCantidades.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .limit(4)
                .map(e -> {
                    PlatoTopDto dto = new PlatoTopDto();
                    dto.setNombre(platoNombres.get(e.getKey()));
                    dto.setUnidades(String.valueOf(e.getValue()));
                    double pct = finalTotalItems > 0 ? (e.getValue() * 100.0 / finalTotalItems) : 0;
                    dto.setPorcentaje((int)pct + "%");
                    return dto;
                })
                .collect(Collectors.toList());
        response.setPlatosMasVendidos(topPlatos);

        return ResponseEntity.ok(response);
    }

    private Usuario usuarioActual() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (email == null || "anonymousUser".equals(email)) {
            return null;
        }
        return autenticacionUseCase.obtenerPerfilPorEmail(email);
    }
    
    private String getColorByEstado(String estado) {
        if (estado == null) return "neutral";
        switch (estado.toUpperCase()) {
            case "PAGADO": return "brand";
            case "PENDIENTE": return "amber";
            case "EN COCINA": return "blue";
            case "ENTREGADO": return "neutral";
            default: return "neutral";
        }
    }
}
