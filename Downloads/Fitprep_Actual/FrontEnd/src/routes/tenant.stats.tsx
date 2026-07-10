import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, KpiCard, Donut } from "@/components/mockup/Shell";

export const Route = createFileRoute("/tenant/stats")({
  head: () => ({ meta: [{ title: "Estadísticas — FitKitchen" }] }),
  component: Stats,
});

function Stats() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Estadísticas"]}>
      <div className="p-8">
        <PageHeader eyebrow="Últimos 30 días" title="Estadísticas del negocio" description="Tendencias clave de operación, ventas y producción." />
        <div className="grid sm:grid-cols-4 gap-5 mb-6">
          <KpiCard label="Ingresos" value="$48,240" delta="↑ 18%" />
          <KpiCard label="Pedidos" value="1,284" delta="↑ 12%" />
          <KpiCard label="Ticket prom." value="$37.60" delta="↑ 4%" />
          <KpiCard label="NPS" value="68" hint="Excelente" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold mb-5">Pedidos vs Capacidad (4 semanas)</h3>
            <svg viewBox="0 0 600 220" className="w-full h-56">
              {[0,1,2,3,4].map(i => <line key={i} x1="40" y1={i*45+20} x2="600" y2={i*45+20} stroke="var(--border)" />)}
              {Array.from({length:4}).map((_,wk) => (
                <g key={wk}>
                  {[78,92,84,96].map((h,i) => (
                    <rect key={i} x={60+wk*140+i*22} y={220-h*1.6-20} width="18" height={h*1.6} fill={i===0?"var(--brand-500)":i===1?"var(--brand-600)":i===2?"var(--brand-700)":"var(--muted-foreground)"} opacity={i===3?0.3:1} rx="2" />
                  ))}
                  <text x={100+wk*140} y={215} textAnchor="middle" fontSize="10" fill="currentColor" opacity={0.5}>Sem {wk+1}</text>
                </g>
              ))}
            </svg>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-5">Mix por categoría</h3>
            <div className="flex justify-center mb-4"><Donut value={42} label="42%" sub="Almuerzo" /></div>
            <div className="space-y-2 text-xs">
              {[["Almuerzo","42%","bg-brand-500"],["Cena","28%","bg-brand-700"],["Desayuno","18%","bg-brand-100"],["Snack","12%","bg-muted"]].map(([l,v,c]) => (
                <div key={l} className="flex items-center gap-3"><div className={`size-2.5 rounded-sm ${c}`} /><span className="flex-1">{l}</span><span className="font-medium tabular-nums">{v}</span></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MockupShell>
  );
}
