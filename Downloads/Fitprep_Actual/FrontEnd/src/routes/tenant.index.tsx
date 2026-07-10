import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, KpiCard, Btn, Badge } from "@/components/mockup/Shell";
import { Download, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/tenant/")({
  head: () => ({ meta: [{ title: "Panel · FitKitchen — NutriFlow" }] }),
  component: TenantDashboard,
});

function TenantDashboard() {
  return (
    <MockupShell breadcrumbs={["FitKitchen Madrid", "Dashboard"]}>
      <div className="p-8">
        <PageHeader eyebrow="FitKitchen Madrid · Hoy 12 May" title="Panel de control" description="Resumen ejecutivo de tu cocina, pedidos y operación semanal." actions={<><Btn variant="outline"><Download className="size-3.5" /> Reporte</Btn><Btn>Crear comida</Btn></>} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <KpiCard label="Ventas semanales" value="$12,480" delta="↑ 12%" hint="vs semana pasada" />
          <KpiCard label="Pedidos activos" value="342" delta="↑ 28 hoy" />
          <KpiCard label="Capacidad cocina" value="88%" hint="540 / 612 porciones" />
          <KpiCard label="Retención" value="94.2%" delta="↑ 1.4pts" />
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
              {[["Pollo Keto","142","82%"],["Bowl Salmón Miso","98","56%"],["Wrap Tofu","76","43%"],["Pasta Pesto","54","31%"]].map(([n,v,p]) => (
                <li key={n}>
                  <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{n}</span><span className="tabular-nums text-muted-foreground">{v}</span></div>
                  <div className="h-1.5 bg-muted rounded-full"><div className="h-full bg-brand-500 rounded-full" style={{width:p}} /></div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 lg:col-span-2 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Pedidos recientes</h3>
              <a href="#" className="text-xs text-brand-600 font-medium">Ver todos →</a>
            </div>
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr><th className="text-left pb-3">Cliente</th><th className="text-left pb-3">Plan</th><th className="text-left pb-3">Estado</th><th className="text-right pb-3">Total</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[["MR","Marcos Rivas","Fuerza & Volumen","Pagado","brand","$85.50"],["SO","Sonia Ocampo","Veggie Pro","Pendiente","neutral","$112.00"],["EG","Elena Gómez","Cutting","En cocina","blue","$72.00"],["CR","Carlos Ruiz","Keto","Camino","amber","$96.40"]].map(([i,n,p,s,t,m]) => (
                  <tr key={n as string}>
                    <td className="py-3"><div className="flex items-center gap-2.5"><div className="size-7 rounded-full bg-brand-100 grid place-items-center text-[10px] font-semibold text-brand-700">{i}</div><span className="font-medium">{n}</span></div></td>
                    <td className="py-3 text-muted-foreground text-xs">{p}</td>
                    <td className="py-3"><Badge tone={t as "brand"|"neutral"|"blue"|"amber"}>{s}</Badge></td>
                    <td className="py-3 text-right tabular-nums font-medium">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Resumen financiero</h3>
            <div className="space-y-3 text-sm">
              <Row label="Ingresos brutos" value="$12,480" />
              <Row label="Comisiones" value="-$1,248" tone="text-muted-foreground" />
              <Row label="Costos insumos" value="-$4,820" tone="text-muted-foreground" />
              <div className="pt-3 border-t border-border flex justify-between"><span className="text-muted-foreground">Margen neto</span><span className="text-lg font-semibold text-brand-600">$6,412</span></div>
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
