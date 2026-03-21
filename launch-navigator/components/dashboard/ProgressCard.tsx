import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  completed: number;
  total: number;
  className?: string;
}

export function ProgressCard({
  title,
  completed,
  total,
  className,
}: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={cn("rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6", className)}>
      <span className="text-sm font-medium text-white/50">{title}</span>
      <div className="flex items-end gap-3 mt-3">
        <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
          {percentage}%
        </span>
        <span className="text-sm text-white/40 mb-1">
          {completed} of {total} completed
        </span>
      </div>
      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
