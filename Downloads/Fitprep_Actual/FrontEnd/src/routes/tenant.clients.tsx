import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge } from "@/components/mockup/Shell";
import { Search } from "lucide-react";

export const Route = createFileRoute("/tenant/clients")({
  head: () => ({ meta: [{ title: "Clientes — FitKitchen" }] }),
  component: Clients,
});

const clients = [
  ["MR","Marcos Rivas","marcos@email.com","Fuerza & Volumen",32,"$2,140","Activo","brand"],
  ["SO","Sonia Ocampo","sonia@email.com","Veggie Pro",18,"$1,420","Activo","brand"],
  ["EG","Elena Gómez","elena@email.com","Cutting",24,"$1,680","Activo","brand"],
  ["CR","Carlos Ruiz","carlos@email.com","Keto",12,"$980","Pausa","amber"],
  ["AT","Andrea Torres","andrea@email.com","Maintenance",42,"$2,840","Activo","brand"],
  ["JV","Jorge Vega","jorge@email.com","Cutting",8,"$520","Cancelado","rose"],
];

function Clients() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Clientes"]}>
      <div className="p-8">
        <PageHeader eyebrow="CRM" title="Clientes" description="184 clientes · 142 activos esta semana" actions={<Btn>Invitar cliente</Btn>} />
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 h-9 rounded-md bg-muted text-sm flex-1 max-w-md">
              <Search className="size-4 text-muted-foreground" />
              <input className="bg-transparent flex-1 outline-none" placeholder="Buscar cliente..." />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-surface text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-5 py-3">Cliente</th><th className="text-left px-5 py-3">Plan</th><th className="text-right px-5 py-3">Pedidos</th><th className="text-right px-5 py-3">LTV</th><th className="text-left px-5 py-3">Estado</th><th /></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map(([i,n,e,p,o,l,s,t]) => (
                <tr key={n as string} className="hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-brand-100 grid place-items-center text-xs font-semibold text-brand-700">{i}</div>
                      <div><div className="font-medium">{n}</div><div className="text-xs text-muted-foreground">{e}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{o}</td>
                  <td className="px-5 py-3 text-right tabular-nums font-medium">{l}</td>
                  <td className="px-5 py-3"><Badge tone={t as "brand"|"amber"|"rose"}>{s}</Badge></td>
                  <td className="px-5 py-3 text-right"><button className="text-xs text-brand-600 font-medium">Ver perfil →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </MockupShell>
  );
}
