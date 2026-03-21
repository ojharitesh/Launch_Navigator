import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface AlertCardProps {
  title: string;
  description: string;
  severity: "warning" | "error" | "info";
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function AlertCard({
  title,
  description,
  severity,
  action,
  className,
}: AlertCardProps) {
  const severityStyles = {
    warning: {
      border: "border-l-amber-500",
      icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
    error: {
      border: "border-l-red-500",
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      iconBg: "bg-red-500/10 border-red-500/20",
    },
    info: {
      border: "border-l-cyan-500",
      icon: <Info className="h-5 w-5 text-cyan-400" />,
      iconBg: "bg-cyan-500/10 border-cyan-500/20",
    },
  };

  const style = severityStyles[severity];

  return (
    <div className={cn("rounded-2xl bg-white/5 border border-white/10 border-l-4 backdrop-blur-sm p-5", style.border, className)}>
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg border", style.iconBg)}>{style.icon}</div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="text-sm text-white/50 mt-1">{description}</p>
          {action && (
            <a
              href={action.href}
              className="inline-block mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition"
            >
              {action.label} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
