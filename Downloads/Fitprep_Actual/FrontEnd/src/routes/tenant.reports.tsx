import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, KpiCard } from "@/components/mockup/Shell";
import { Download } from "lucide-react";

export const Route = createFileRoute("/tenant/reports")({
  head: () => ({ meta: [{ title: "Reportes — FitKitchen" }] }),
  component: Reports,
});

const reports = [
  ["Ventas mensuales · Mayo 2026","Generado hace 2 horas","PDF · 24 pág"],
  ["Adherencia de clientes · Q2","Generado hace 1 día","PDF · 12 pág"],
  ["Eficiencia de cocina · Abril","Generado hace 4 días","XLSX · 8 hojas"],
  ["Desperdicio y mermas","Generado hace 1 semana","PDF · 18 pág"],
  ["Top platos · YTD","Generado hace 2 semanas","CSV"],
];

function Reports() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Reportes"]}>
      <div className="p-8">
        <PageHeader eyebrow="Inteligencia de negocio" title="Reportes" description="Genera, descarga y comparte reportes ejecutivos." actions={<Btn>+ Nuevo reporte</Btn>} />
        <div className="grid sm:grid-cols-4 gap-5 mb-6">
          <KpiCard label="Reportes este mes" value="14" />
          <KpiCard label="Programados" value="6" hint="Automáticos" />
          <KpiCard label="Compartidos" value="9" />
          <KpiCard label="Plantillas" value="22" />
        </div>
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border">
            {reports.map(([t,d,f]) => (
              <li key={t} className="p-5 flex items-center gap-5">
                <div className="size-10 rounded-lg bg-brand-50 grid place-items-center text-brand-700"><Download className="size-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d} · {f}</div>
                </div>
                <Btn variant="outline" size="sm">Descargar</Btn>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </MockupShell>
  );
}
