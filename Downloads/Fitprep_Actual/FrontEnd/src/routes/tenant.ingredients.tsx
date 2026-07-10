import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge } from "@/components/mockup/Shell";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/tenant/ingredients")({
  head: () => ({ meta: [{ title: "Ingredientes — FitKitchen" }] }),
  component: Ingredients,
});

const items = [
  ["Pollo orgánico","Proteína","kg",24.5,12,"$8.20","brand"],
  ["Quinoa real","Cereal","kg",18.2,5,"$6.50","amber"],
  ["Salmón fresco","Pescado","kg",12.8,15,"$22.40","brand"],
  ["Brócoli","Vegetal","kg",32.0,8,"$3.10","brand"],
  ["Aceite oliva extra","Aceite","L",8.5,10,"$11.20","amber"],
  ["Lentejas rojas","Legumbre","kg",22.0,4,"$4.80","rose"],
  ["Tofu firme","Proteína","kg",14.0,20,"$5.60","brand"],
];

function Ingredients() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Ingredientes"]}>
      <div className="p-8">
        <PageHeader eyebrow="Inventario" title="Gestión de ingredientes" description="Stock actual y alertas de reposición." actions={<Btn>Agregar ingrediente</Btn>} />

        <div className="grid sm:grid-cols-4 gap-5 mb-6">
          {[["Items totales","124"],["Stock crítico","3","destructive"],["Pedidos en camino","8"],["Valor inventario","$8,420"]].map(([l,v,d]) => (
            <Card key={l} className="p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{l}</div>
              <div className={`text-2xl font-semibold ${d==="destructive"?"text-destructive":""}`}>{v}</div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-5 py-3">Ingrediente</th><th className="text-left px-5 py-3">Tipo</th><th className="text-right px-5 py-3">Stock</th><th className="text-right px-5 py-3">Días restantes</th><th className="text-right px-5 py-3">Costo/u</th><th className="text-left px-5 py-3">Estado</th><th /></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map(([n,t,u,s,d,c,tone]) => (
                <tr key={n as string} className="hover:bg-muted/40">
                  <td className="px-5 py-3 font-medium">{n}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{s} {u}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{d}d</td>
                  <td className="px-5 py-3 text-right tabular-nums font-medium">{c}</td>
                  <td className="px-5 py-3">
                    <Badge tone={tone as "brand"|"amber"|"rose"}>{tone==="brand"?"OK":tone==="amber"?<><AlertTriangle className="size-3" /> Bajo</>:<><AlertTriangle className="size-3" /> Crítico</>}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right"><Btn variant="outline" size="sm">Pedir</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </MockupShell>
  );
}
