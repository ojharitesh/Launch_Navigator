import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 hover:border-white/20 transition-colors", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white/50">{title}</span>
        {icon && <div className="text-cyan-400/60">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      {description && (
        <p className="text-sm text-white/40 mt-1">{description}</p>
      )}
      {trend && (
        <p
          className={cn(
            "text-sm mt-1",
            trend.isPositive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
        </p>
      )}
    </div>
  );
}
