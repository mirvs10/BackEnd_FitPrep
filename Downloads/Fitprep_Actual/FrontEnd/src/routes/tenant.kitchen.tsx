import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge } from "@/components/mockup/Shell";

export const Route = createFileRoute("/tenant/kitchen")({
  head: () => ({ meta: [{ title: "Planeamiento de cocina — FitKitchen" }] }),
  component: Kitchen,
});

const tasks = [
  ["06:00","Mise en place","Quinoa, vegetales, marinados","Chef Pablo","brand"],
  ["07:00","Cocción base","Salmón al horno · 45 porciones","Estación 1","brand"],
  ["08:30","Cocción base","Pollo grillado · 80 porciones","Estación 2","brand"],
  ["10:00","Salsas y aderezos","Pesto, vinagretas, hummus","Chef Marta","blue"],
  ["11:30","Emplatado","Bowls vegetales · 32","Estación 3","amber"],
  ["13:00","Empacado","Sellado y etiquetado","Equipo packing","neutral"],
  ["14:30","Despacho","Entregas zonas norte y sur","Logística","neutral"],
];

function Kitchen() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Cocina", "Planeamiento"]}>
      <div className="p-8 max-w-5xl mx-auto">
        <PageHeader eyebrow="Programa del día · 12 May" title="Planeamiento de cocina" description="Cronograma operativo para tu equipo." actions={<Btn>Imprimir programa</Btn>} />
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border">
            {tasks.map(([h,t,d,r,tone],i) => (
              <li key={i} className="p-5 flex items-start gap-5">
                <div className="text-right shrink-0 w-16">
                  <div className="text-sm font-mono font-semibold tabular-nums">{h}</div>
                  <div className="text-[10px] text-muted-foreground">{i===0?"Inicio":i===tasks.length-1?"Cierre":""}</div>
                </div>
                <div className="size-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone={tone as "brand"|"blue"|"amber"|"neutral"}>{t}</Badge>
                    <span className="text-xs text-muted-foreground">{r}</span>
                  </div>
                  <div className="text-sm font-medium">{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </MockupShell>
  );
}
