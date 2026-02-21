import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      iconBg: "bg-amber-100",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      iconBg: "bg-red-100",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <Info className="h-5 w-5 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
  };

  const style = severityStyles[severity];

  return (
    <Card className={cn("border-l-4", style.border, className)}>
      <CardHeader className="flex flex-row items-start gap-3 pb-2">
        <div className={cn("p-2 rounded-lg", style.iconBg)}>{style.icon}</div>
        <CardTitle className="text-base font-semibold text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">{description}</p>
        {action && (
          <a
            href={action.href}
            className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
          >
            {action.label} →
          </a>
        )}
      </CardContent>
    </Card>
  );
}
