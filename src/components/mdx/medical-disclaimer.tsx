import { ShieldAlert } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Aviso médico"
      className="not-prose my-10 flex gap-3 rounded-lg border border-amber-300/60 bg-amber-50/70 p-5 text-amber-950"
    >
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="space-y-2 text-sm leading-relaxed">
        <p className="font-semibold leading-tight">Aviso médico</p>
        <p>
          La información de este artículo tiene carácter divulgativo y
          educativo. <strong>No sustituye</strong> el diagnóstico, tratamiento
          ni el consejo personalizado de un profesional sanitario cualificado
          (médico, fisioterapeuta o especialista). Si tienes dolor persistente,
          intenso o acompañado de otros síntomas, consulta siempre con un
          profesional. Antes de iniciar cualquier rutina de ejercicios, valora
          tu situación con tu médico, especialmente si tienes alguna patología
          previa.
        </p>
      </div>
    </aside>
  );
}
