import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn } from "@/components/mockup/Shell";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/tenant/calendar")({
  head: () => ({ meta: [{ title: "Calendario de producción — FitKitchen" }] }),
  component: CalendarRoute,
});

function CalendarRoute() {
  const events: Record<number, Array<{ t: string; c: string }>> = {
    3: [{t:"Cocción salmón", c:"brand"}],
    5: [{t:"Mantenimiento horno", c:"amber"}],
    8: [{t:"Pico de pedidos", c:"blue"}],
    12: [{t:"Lanzamiento menú", c:"brand"},{t:"Auditoría calidad",c:"neutral"}],
    15: [{t:"Cierre semana", c:"neutral"}],
    18: [{t:"Producción especial", c:"brand"}],
    21: [{t:"Capacitación equipo", c:"amber"}],
    25: [{t:"Inventario mensual", c:"blue"}],
  };
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Calendario"]}>
      <div className="p-8">
        <PageHeader eyebrow="Mayo 2026" title="Calendario de producción" actions={<><Btn variant="outline" size="sm"><ChevronLeft className="size-3.5" /></Btn><Btn variant="outline" size="sm"><ChevronRight className="size-3.5" /></Btn><Btn>+ Evento</Btn></>} />
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
            {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(d => <div key={d} className="px-3 py-3 text-center border-r border-border last:border-r-0">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({length:35}).map((_,i) => {
              const day = i - 3; // offset
              const valid = day >= 1 && day <= 31;
              const ev = valid ? events[day] : undefined;
              return (
                <div key={i} className={`min-h-[110px] border-r border-b border-border last:border-r-0 p-2 ${valid?"":"bg-muted/30"} ${day===12?"bg-brand-50/30":""}`}>
                  {valid && <div className={`text-xs font-medium mb-1.5 ${day===12?"text-brand-600":""}`}>{day}</div>}
                  <div className="space-y-1">
                    {ev?.map((e,idx) => (
                      <div key={idx} className={`text-[10px] truncate px-1.5 py-0.5 rounded ${e.c==="brand"?"bg-brand-50 text-brand-700":e.c==="amber"?"bg-amber-50 text-amber-700":e.c==="blue"?"bg-blue-50 text-blue-700":"bg-muted text-muted-foreground"}`}>{e.t}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </MockupShell>
  );
}
