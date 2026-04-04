"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface ChartDataPoint {
  day: string;
  value: number;
}

interface SpendingChartProps {
  data: ChartDataPoint[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  // Find the maximum value to scale the bars
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-cyan-400">
          <BarChart3 className="h-5 w-5" />
          <h3 className="font-semibold text-white">Local Spending Index</h3>
        </div>
        <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/70">
          Last 7 Days
        </div>
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-2 mt-auto">
        {data.map((point, i) => {
          // Calculate height percentage (min 10% so it's always visible)
          const heightPercent = Math.max((point.value / maxValue) * 100, 10);
          
          return (
            <div key={point.day} className="flex flex-col items-center gap-2 group flex-1">
              <div className="relative w-full flex justify-center h-32 md:h-40 items-end">
                {/* Tooltip on hover */}
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] px-2 py-1 rounded-md border border-white/10 pointer-events-none whitespace-nowrap z-10">
                  ${point.value.toLocaleString()}
                </div>
                
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="w-full max-w-[2rem] rounded-t-sm bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 group-hover:to-cyan-300 transition-colors relative overflow-hidden"
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                </motion.div>
              </div>
              <span className="text-[10px] sm:text-xs text-white/50 group-hover:text-white/80 transition-colors">
                {point.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
