import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, DollarSign, Clock, FileText, ExternalLink, HelpCircle } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    detailed_steps?: string[];
    cost_estimate: string;
    cost_details?: string;
    timeline_estimate: string;
    timeline_details?: string;
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
  const [expanded, setExpanded] = useState(false);

  const categoryColors: Record<string, string> = {
    registration: "bg-blue-100 text-blue-700",
    legal: "bg-purple-100 text-purple-700",
    permits: "bg-orange-100 text-orange-700",
    insurance: "bg-green-100 text-green-700",
    tax: "bg-red-100 text-red-700",
    compliance: "bg-amber-100 text-amber-700",
    operations: "bg-slate-100 text-slate-700",
  };

  const categoryLabels: Record<string, string> = {
    registration: "Registration",
    legal: "Legal",
    permits: "Permits & Licenses",
    insurance: "Insurance",
    tax: "Taxes",
    compliance: "Compliance",
    operations: "Operations",
  };

  return (
    <Card className={cn("transition-all", className)}>
      <CardContent className="p-0">
        {/* Main content */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(!completed)}
              className={cn(
                "mt-1 h-6 w-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                completed
                  ? "bg-green-500 border-green-500"
                  : "border-slate-300 hover:border-primary"
              )}
            >
              {completed && <Check className="h-4 w-4 text-white" />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={cn(
                    "font-semibold text-lg text-slate-900",
                    completed && "line-through text-slate-500"
                  )}
                >
                  {task.title}
                </h3>
                <span
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-full flex-shrink-0",
                    categoryColors[task.category] || "bg-slate-100 text-slate-700"
                  )}
                >
                  {categoryLabels[task.category] || task.category}
                </span>
              </div>

              <p className="text-slate-600 mt-2">{task.description}</p>

              {/* Quick info */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{task.cost_estimate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{task.timeline_estimate}</span>
                </div>
              </div>

              {/* Required documents */}
              {task.required_documents && task.required_documents.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    What you&apos;ll need
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {task.required_documents.map((doc, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
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
                  className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
                >
                  Visit Official Website <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Expand button */}
          {task.detailed_steps && task.detailed_steps.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>Hide Step-by-Step Guide</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>Show Step-by-Step Guide</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Expanded detailed steps */}
        {expanded && task.detailed_steps && (
          <div className="px-5 pb-5 pt-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Step-by-Step Guide
              </h4>

              <ol className="space-y-4">
                {task.detailed_steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 h-6 w-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-700 pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>

              {/* Cost details */}
              {task.cost_details && (
                <div className="mt-5 pt-4 border-t border-blue-100">
                  <p className="text-sm font-medium text-slate-700">
                    💰 Cost Details: {task.cost_details}
                  </p>
                </div>
              )}

              {/* Timeline details */}
              {task.timeline_details && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-700">
                    ⏱️ Timeline: {task.timeline_details}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
