import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge, KpiCard } from "@/components/mockup/Shell";

export const Route = createFileRoute("/tenant/orders")({
  head: () => ({ meta: [{ title: "Pedidos semanales — FitKitchen" }] }),
  component: Orders,
});

function Orders() {
  const days = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Pedidos semanales"]}>
      <div className="p-8">
        <PageHeader eyebrow="Semana 12-18 May" title="Pedidos semanales" description="Vista consolidada de demanda por día." actions={<Btn>Exportar plan</Btn>} />
        <div className="grid sm:grid-cols-4 gap-5 mb-6">
          <KpiCard label="Pedidos totales" value="342" delta="↑ 18%" />
          <KpiCard label="Porciones planificadas" value="2,860" />
          <KpiCard label="Ingreso proyectado" value="$24,820" />
          <KpiCard label="Capacidad usada" value="88%" hint="Pico jueves 12:00" />
        </div>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {days.map((d,i) => (
              <div key={d} className={`p-4 text-center border-r border-border last:border-r-0 ${i===3?"bg-brand-50/40":""}`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{d}</div>
                <div className="text-lg font-semibold mt-0.5">{12+i}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((d, idx) => (
              <div key={d} className="p-3 space-y-2 border-r border-border last:border-r-0 min-h-[300px]">
                {[["Desayuno", 32+idx*2], ["Almuerzo", 84+idx*3], ["Snack", 28+idx], ["Cena", 56+idx*2]].map(([m,c], i) => (
                  <div key={m as string} className="p-2.5 rounded-lg bg-surface border border-border">
                    <Badge tone={i===0?"amber":i===1?"brand":i===2?"neutral":"blue"}>{m as string}</Badge>
                    <div className="text-lg font-semibold tabular-nums mt-1">{c}</div>
                    <div className="text-[10px] text-muted-foreground">porciones</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MockupShell>
  );
}
