import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn } from "@/components/mockup/Shell";

export const Route = createFileRoute("/tenant/settings")({
  head: () => ({ meta: [{ title: "Configuración del negocio — FitKitchen" }] }),
  component: SettingsRoute,
});

function SettingsRoute() {
  return (
    <MockupShell breadcrumbs={["FitKitchen", "Configuración"]}>
      <div className="p-8 max-w-4xl">
        <PageHeader eyebrow="Negocio" title="Configuración" description="Datos públicos, branding, fiscales y operativos." actions={<><Btn variant="outline">Cancelar</Btn><Btn>Guardar</Btn></>} />
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <nav className="space-y-1 text-sm">
              {["Perfil del negocio","Branding","Facturación","Equipo","Integraciones","Notificaciones","Seguridad"].map((t,i) => (
                <button key={t} className={`w-full text-left px-3 py-2 rounded-md ${i===0?"bg-brand-50 text-brand-700 font-medium":"hover:bg-muted text-muted-foreground"}`}>{t}</button>
              ))}
            </nav>
          </aside>
          <div className="lg:col-span-3 space-y-5">
            <Card className="p-6">
              <h3 className="text-sm font-semibold mb-4">Perfil público</h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="size-16 rounded-2xl bg-brand-100 grid place-items-center text-xl font-bold text-brand-700">FK</div>
                <div>
                  <Btn variant="outline" size="sm">Cambiar logo</Btn>
                  <p className="text-[10px] text-muted-foreground mt-1.5">PNG cuadrado, mín 256px</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Nombre comercial" defaultValue="FitKitchen Madrid" />
                <Input label="URL pública" defaultValue="nutriflow.app/fitkitchen" />
                <Input label="Email contacto" defaultValue="hola@fitkitchen.es" />
                <Input label="Teléfono" defaultValue="+34 910 123 456" />
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-semibold mb-4">Horario operativo</h3>
              <div className="space-y-2 text-sm">
                {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"].map((d,i) => (
                  <div key={d} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <span className="font-medium">{d}</span>
                    <span className="text-muted-foreground tabular-nums">{i<5?"06:00 — 22:00":i===5?"08:00 — 18:00":"Cerrado"}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <div><label className="text-xs font-medium mb-1.5 block">{label}</label><input {...rest} className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm" /></div>;
}
