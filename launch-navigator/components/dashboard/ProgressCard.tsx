import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-slate-900">
            {percentage}%
          </span>
          <span className="text-sm text-slate-500 mb-1">
            {completed} of {total} completed
          </span>
        </div>
        <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
