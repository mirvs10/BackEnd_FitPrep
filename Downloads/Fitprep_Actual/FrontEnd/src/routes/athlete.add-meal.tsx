import { createFileRoute } from "@tanstack/react-router";
import { MockupShell, PageHeader, Card, Btn, Badge } from "@/components/mockup/Shell";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/athlete/add-meal")({
  head: () => ({ meta: [{ title: "Agregar comida — NutriFlow" }] }),
  component: AddMeal,
});

function AddMeal() {
  return (
    <MockupShell breadcrumbs={["Atleta", "Plan", "Agregar comida"]}>
      <div className="p-8">
        <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/5 max-w-3xl mx-auto overflow-hidden">
          <div className="px-6 h-14 flex items-center justify-between border-b border-border">
            <div>
              <div className="text-xs text-muted-foreground">Martes 13 · Almuerzo</div>
              <div className="text-sm font-semibold">Agregar comida al día</div>
            </div>
            <button className="size-8 grid place-items-center rounded-md hover:bg-muted"><X className="size-4" /></button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 px-3 h-10 rounded-md bg-muted text-sm mb-4">
              <Search className="size-4 text-muted-foreground" />
              <input className="flex-1 bg-transparent outline-none" placeholder="Buscar comida en FitKitchen..." defaultValue="pollo" />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Alto en proteína","Bajo en carbos","Vegano","Sin gluten","< 500 kcal"].map((t,i) => (
                <button key={t} className={`px-3 h-7 rounded-full text-xs font-medium border ${i===0?"bg-foreground text-background border-foreground":"border-border hover:bg-muted"}`}>{t}</button>
              ))}
            </div>
            <ul className="divide-y divide-border max-h-[420px] overflow-y-auto">
              {[
                ["Pollo al Limón & Quinoa", 520, 45, 52, 14, true],
                ["Pechuga de Pollo Teriyaki", 480, 48, 38, 12],
                ["Pollo BBQ con Arroz Integral", 560, 44, 60, 14],
                ["Ensalada César de Pollo", 420, 36, 22, 20],
                ["Pollo al Curry & Coliflor", 390, 42, 18, 14],
              ].map(([n,k,p,c,f,sel]) => (
                <li key={n as string} className={`flex items-center gap-4 py-3 px-2 rounded-lg ${sel?"bg-brand-50/50":""}`}>
                  <div className="size-12 rounded-lg bg-gradient-to-br from-brand-100 to-brand-50" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{n}</div>
                    <div className="text-xs text-muted-foreground tabular-nums mt-0.5">{k} kcal · P {p}g · C {c}g · G {f}g</div>
                  </div>
                  {sel ? <Badge tone="brand">Seleccionado</Badge> : <Btn variant="outline" size="sm">Agregar</Btn>}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-surface">
            <div className="text-xs text-muted-foreground">1 comida seleccionada · 520 kcal</div>
            <div className="flex gap-2"><Btn variant="outline">Cancelar</Btn><Btn>Agregar al día</Btn></div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
