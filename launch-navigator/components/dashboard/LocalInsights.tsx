"use client";

import { useEffect, useState } from "react";
import { getMockInsights } from "@/data/mock-insights";
import { NewsFeedCard, SpendingTrendsCard, AlertFeedCard } from "./InsightCards";
import { SpendingChart } from "./charts/SpendingChart";
import { BusinessType } from "@/types";

interface LocalInsightsProps {
  state?: string;
  businessType?: BusinessType | "general";
}

export function LocalInsights({ state = "your state", businessType = "general" }: LocalInsightsProps) {
  const [insights, setInsights] = useState<ReturnType<typeof getMockInsights> | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we load mock data client-side to keep it fast
    setInsights(getMockInsights(state, businessType));
  }, [state, businessType]);

  if (!insights) return null;

  return (
    <div className="w-full mt-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Local Intelligence
            <span className="text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
              Beta
            </span>
          </h2>
          <p className="text-white/50 mt-1">Real-time data for the {state} area to help you make smarter decisions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Alerts take up 1 column */}
        <div className="lg:col-span-1">
          <AlertFeedCard alerts={insights.alerts} />
        </div>

        {/* Spending Chart takes up 2 columns */}
        <div className="lg:col-span-2">
          <SpendingChart data={insights.chartData} />
        </div>

        {/* Trends takes up 1 column */}
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1">
              <SpendingTrendsCard trends={insights.trends} />
            </div>
          </div>
        </div>

        {/* News takes up full width on bottom or 2 cols on lg layout */}
        <div className="lg:col-span-4 mt-2">
          <NewsFeedCard news={insights.news} />
        </div>
      </div>
    </div>
  );
}
