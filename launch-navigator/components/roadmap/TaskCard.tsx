import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    cost_estimate: string;
    timeline_estimate: string;
    required_documents: string[];
    official_link: string | null;
    category: string;
  };
  completed: boolean;
  onToggle: (completed: boolean) => void;
  className?: string;
}

export function TaskCard({
  task,
  completed,
  onToggle,
  className,
}: TaskCardProps) {
  const categoryColors: Record<string, string> = {
    registration: "bg-blue-100 text-blue-700",
    legal: "bg-purple-100 text-purple-700",
    permits: "bg-orange-100 text-orange-700",
    insurance: "bg-green-100 text-green-700",
    tax: "bg-red-100 text-red-700",
    compliance: "bg-amber-100 text-amber-700",
    operations: "bg-slate-100 text-slate-700",
  };

  return (
    <Card className={cn("transition-all", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => onToggle(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={cn(
                  "font-semibold text-slate-900",
                  completed && "line-through text-slate-500"
                )}
              >
                {task.title}
              </h3>
              <span
                className={cn(
                  "px-2 py-0.5 text-xs font-medium rounded-full",
                  categoryColors[task.category] || "bg-slate-100 text-slate-700"
                )}
              >
                {task.category}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-1">{task.description}</p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
              {task.cost_estimate && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Cost:</span> {task.cost_estimate}
                </span>
              )}
              {task.timeline_estimate && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Timeline:</span>{" "}
                  {task.timeline_estimate}
                </span>
              )}
            </div>

            {/* Required documents */}
            {task.required_documents && task.required_documents.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Required Documents
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {task.required_documents.map((doc, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Official link */}
            {task.official_link && (
              <a
                href={task.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
              >
                Visit Official Website →
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
