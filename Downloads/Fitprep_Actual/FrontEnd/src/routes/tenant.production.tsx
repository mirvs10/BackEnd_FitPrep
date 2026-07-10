import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge } from "@/components/mockup/Shell";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/tenant/production")({
  head: () => ({ meta: [{ title: "Producción diaria — FitKitchen" }] }),
  component: Production,
});

const cols = [
  { t: "En Preparación", count: 12, tone: "neutral", items: [
    ["#4902","Plan Keto · 12 comidas","Carlos Ruiz","45 min","amber"],
    ["#4905","Personalizado · 5","Elena Gómez","30 min","neutral"],
    ["#4908","Fuerza & Volumen · 14","Andrea Torres","1h 20m","neutral"],
  ]},
  { t: "En Cocción", count: 8, tone: "brand", items: [
    ["#4889","Salmón Grillado · 24","Lote #443","20 min","brand"],
    ["#4891","Pollo Marinado · 36","Lote #444","35 min","brand"],
  ]},
  { t: "Empacado", count: 6, tone: "blue", items: [
    ["#4870","Bowls Vegetales · 18","Listo para reparto","-","blue"],
    ["#4872","Wraps Tofu · 12","Esperando logística","-","blue"],
  ]},
  { t: "Listo para envío", count: 4, tone: "brand", items: [
    ["#4855","Pedido Sonia O.","Salida 14:00","-","brand"],
  ]},
];

function Production() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Producción"]}>
      <div className="p-8">
        <PageHeader eyebrow="Cocina · Hoy 12 May" title="Tablero de producción" description="Mueve las tarjetas conforme avanza la cocina." actions={<><Btn variant="outline">Filtrar</Btn><Btn>Imprimir tickets</Btn></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cols.map(col => (
            <div key={col.t} className="rounded-2xl bg-surface border border-border p-3">
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${col.tone==="brand"?"bg-brand-500":col.tone==="blue"?"bg-blue-500":"bg-muted-foreground"}`} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">{col.t}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-card border border-border text-muted-foreground tabular-nums">{col.count}</span>
                </div>
              </div>
              <div className="space-y-2">
                {col.items.map(([id,t,s,time,tone]) => (
                  <Card key={id as string} className={`p-3 cursor-grab ${tone==="amber"?"border-l-2 border-l-amber-500":""}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      {tone==="amber" ? <Badge tone="amber">Prioritario</Badge> : <Badge>Estándar</Badge>}
                      <span className="text-[10px] font-mono text-muted-foreground">{id}</span>
                    </div>
                    <div className="text-sm font-medium leading-tight">{t}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s}</div>
                    {time !== "-" && <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="size-3" /> {time}</div>}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}
