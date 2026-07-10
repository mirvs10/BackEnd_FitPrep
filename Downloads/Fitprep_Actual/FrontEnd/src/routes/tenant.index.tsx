import { createFileRoute, Link } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, KpiCard, Btn, Badge } from "@/components/mockup/Shell";
import { Download, TrendingUp, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tenantService } from "@/lib/api";

export const Route = createFileRoute("/tenant/")({
  head: () => ({ meta: [{ title: "Panel · FitKitchen — NutriFlow" }] }),
  component: TenantDashboard,
});

function TenantDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["tenantDashboard"],
    queryFn: tenantService.obtenerDashboard,
  });

  return (
    <MockupShell breadcrumbs={["FitKitchen Madrid", "Dashboard"]}>
      <div className="p-8">
        <PageHeader eyebrow="FitKitchen Madrid" title="Panel de control" description="Resumen ejecutivo de tu cocina, pedidos y operación semanal." actions={<><Btn variant="outline"><Download className="size-3.5" /> Reporte</Btn><Link to="/tenant/meals/new"><Btn><Plus className="size-3.5" /> Crear comida</Btn></Link></>} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <KpiCard label="Ventas totales" value={`$${data?.ventasSemanales?.toFixed(2) || '0.00'}`} delta="calculado al día" />
          <KpiCard label="Pedidos activos" value={data?.pedidosActivos?.toString() || '0'} delta="en cola" />
          <KpiCard label="Capacidad cocina" value="--" hint="Próximamente" />
          <KpiCard label="Retención" value="--" hint="Próximamente" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold">Ingresos · últimas 12 semanas</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Promedio $11,240 / semana</p>
              </div>
              <Badge tone="brand"><TrendingUp className="size-3" /> +18% MoM</Badge>
            </div>
            <svg viewBox="0 0 600 200" className="w-full h-56">
              <defs>
                <linearGradient id="grev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-500)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--brand-500)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0,1,2,3].map(i => <line key={i} x1="0" y1={i*50+10} x2="600" y2={i*50+10} stroke="var(--border)" />)}
              <path d="M0,150 L50,140 L100,120 L150,130 L200,100 L250,110 L300,90 L350,80 L400,100 L450,70 L500,60 L550,50 L600,40" stroke="var(--brand-500)" strokeWidth="2.5" fill="none" />
              <path d="M0,150 L50,140 L100,120 L150,130 L200,100 L250,110 L300,90 L350,80 L400,100 L450,70 L500,60 L550,50 L600,40 L600,200 L0,200 Z" fill="url(#grev)" />
            </svg>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-5">Platos más vendidos</h3>
            <ul className="space-y-3.5">
              {isLoading ? (
                <div className="text-xs text-muted-foreground">Cargando...</div>
              ) : data?.platosMasVendidos?.length === 0 ? (
                <div className="text-xs text-muted-foreground">No hay datos de ventas aún.</div>
              ) : (
                data?.platosMasVendidos?.map((p: any) => (
                  <li key={p.nombre}>
                    <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{p.nombre}</span><span className="tabular-nums text-muted-foreground">{p.unidades}</span></div>
                    <div className="h-1.5 bg-muted rounded-full"><div className="h-full bg-brand-500 rounded-full" style={{width: p.porcentaje}} /></div>
                  </li>
                ))
              )}
            </ul>
          </Card>

          <Card className="p-6 lg:col-span-2 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Pedidos recientes</h3>
              <a href="#" className="text-xs text-brand-600 font-medium">Ver todos →</a>
            </div>
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr><th className="text-left pb-3">Cliente</th><th className="text-left pb-3">Pedido</th><th className="text-left pb-3">Estado</th><th className="text-right pb-3">Total</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr><td colSpan={4} className="py-3 text-xs text-muted-foreground">Cargando...</td></tr>
                ) : data?.pedidosRecientes?.length === 0 ? (
                  <tr><td colSpan={4} className="py-3 text-xs text-muted-foreground">No tienes pedidos recientes.</td></tr>
                ) : (
                  data?.pedidosRecientes?.map((p: any) => (
                    <tr key={p.idPedido}>
                      <td className="py-3"><div className="flex items-center gap-2.5"><div className="size-7 rounded-full bg-brand-100 grid place-items-center text-[10px] font-semibold text-brand-700">{p.cliente.substring(0, 2)}</div><span className="font-medium">{p.cliente}</span></div></td>
                      <td className="py-3 text-muted-foreground text-xs">{p.idPedido}</td>
                      <td className="py-3"><Badge tone={p.colorBadge as any}>{p.estado}</Badge></td>
                      <td className="py-3 text-right tabular-nums font-medium">{p.monto}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Resumen financiero</h3>
            <div className="space-y-3 text-sm">
              <Row label="Ingresos brutos" value={`$${data?.ventasSemanales?.toFixed(2) || '0.00'}`} />
              <Row label="Comisiones" value="N/A" tone="text-muted-foreground" />
              <Row label="Costos insumos" value="N/A" tone="text-muted-foreground" />
              <div className="pt-3 border-t border-border flex justify-between"><span className="text-muted-foreground">Margen neto</span><span className="text-lg font-semibold text-brand-600">N/A</span></div>
            </div>
          </Card>
        </div>
      </div>
    </MockupShell>
  );
}
function Row({ label, value, tone="" }: { label: string; value: string; tone?: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className={`tabular-nums font-medium ${tone}`}>{value}</span></div>;
}
