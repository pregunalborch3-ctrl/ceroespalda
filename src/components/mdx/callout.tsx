import { Info, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "danger";

const styles: Record<
  CalloutType,
  { wrap: string; icon: typeof Info; label: string }
> = {
  info: {
    wrap: "border-sky-300/60 bg-sky-50 text-sky-900",
    icon: Info,
    label: "Información",
  },
  tip: {
    wrap: "border-emerald-300/60 bg-emerald-50 text-emerald-900",
    icon: Lightbulb,
    label: "Consejo",
  },
  warning: {
    wrap: "border-amber-300/60 bg-amber-50 text-amber-900",
    icon: AlertTriangle,
    label: "Atención",
  },
  danger: {
    wrap: "border-red-300/60 bg-red-50 text-red-900",
    icon: ShieldAlert,
    label: "Importante",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { wrap, icon: Icon, label } = styles[type];
  return (
    <aside
      role="note"
      aria-label={title ?? label}
      className={cn("not-prose my-6 flex gap-3 rounded-lg border p-4", wrap)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p className="font-semibold leading-tight">{title ?? label}</p>
        <div className="text-sm leading-relaxed [&_p]:m-0 [&_p+p]:mt-2">
          {children}
        </div>
      </div>
    </aside>
  );
}
