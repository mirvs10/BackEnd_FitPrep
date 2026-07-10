import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn } from "@/components/mockup/Shell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/tenant/shopping")({
  head: () => ({ meta: [{ title: "Lista de compras — FitKitchen" }] }),
  component: Shopping,
});

const groups = [
  { t: "Proteínas", items: [["Pollo orgánico","42 kg","$8.20","$344.40"],["Salmón fresco","18 kg","$22.40","$403.20"],["Tofu firme","12 kg","$5.60","$67.20"]] },
  { t: "Vegetales", items: [["Brócoli","24 kg","$3.10","$74.40"],["Espárragos verdes","8 kg","$6.80","$54.40"],["Pimiento rojo","6 kg","$4.20","$25.20"]] },
  { t: "Cereales y granos", items: [["Quinoa real","20 kg","$6.50","$130.00"],["Arroz integral","15 kg","$2.80","$42.00"]] },
];

function Shopping() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Compras"]}>
      <div className="p-8 max-w-5xl">
        <PageHeader eyebrow="Generada · 12 May" title="Lista de compras de insumos" description="Calculada automáticamente según los pedidos confirmados de la semana." actions={<><Btn variant="outline">PDF</Btn><Btn>Enviar a proveedor</Btn></>} />
        {groups.map(g => (
          <Card key={g.t} className="overflow-hidden mb-5">
            <div className="px-5 py-3 bg-surface border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">{g.t}</h3>
              <span className="text-xs text-muted-foreground tabular-nums">{g.items.length} items · ${g.items.reduce((s,[,,,t]) => s + parseFloat((t as string).replace("$","")), 0).toFixed(2)}</span>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {g.items.map(([n,c,p,t]) => (
                  <tr key={n}>
                    <td className="px-5 py-3 w-10"><button className="size-5 rounded border-2 border-border hover:border-brand-500"><Check className="size-3 opacity-0" /></button></td>
                    <td className="px-5 py-3 font-medium">{n}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{c}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{p}</td>
                    <td className="px-5 py-3 text-right tabular-nums font-semibold w-24">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
        <Card className="p-5 flex items-center justify-between bg-brand-50/40 border-brand-500/30">
          <div className="text-sm">Total estimado de la compra</div>
          <div className="text-2xl font-semibold tabular-nums">$1,140.80</div>
        </Card>
      </div>
    </MockupShell>
  );
}
