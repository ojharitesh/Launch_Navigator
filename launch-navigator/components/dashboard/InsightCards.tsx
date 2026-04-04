"use client";

import { LocalAlert, LocalNews, SpendingTrend } from "@/data/mock-insights";
import { cn } from "@/lib/utils";
import { ExternalLink, TrendingDown, TrendingUp, AlertTriangle, Info, AlertCircle, Newspaper } from "lucide-react";

export function NewsFeedCard({ news }: { news: LocalNews[] }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-cyan-400">
        <Newspaper className="h-5 w-5" />
        <h3 className="font-semibold text-white">Local Hub</h3>
      </div>
      <div className="flex-1 space-y-4">
        {news.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-cyan-400/80 font-medium">{item.category}</span>
              <span className="text-white/40">{item.timeAgo}</span>
            </div>
            <p className="text-sm text-white/90 font-medium group-hover:text-cyan-300 transition-colors line-clamp-2">
              {item.title}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-white/50">{item.source}</span>
              <ExternalLink className="h-3 w-3 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-px w-full bg-white/5 mt-3 group-last:hidden" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SpendingTrendsCard({ trends }: { trends: SpendingTrend[] }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border border-white/10 backdrop-blur-md p-6 h-full border-t-cyan-500/20">
      <div className="flex items-center gap-2 mb-4 text-white">
        <TrendingUp className="h-5 w-5 text-emerald-400" />
        <h3 className="font-semibold">Market Trends</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {trends.map((trend) => (
          <div key={trend.id} className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="text-sm font-medium text-white/60">{trend.category}</div>
            <div className="flex items-end gap-2 mt-2">
              <div className="text-2xl font-bold text-white">
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </div>
              <div className="text-xs text-white/40 mb-1">{trend.timeframe}</div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={cn("text-xs font-medium", trend.isPositive ? "text-emerald-400" : "text-red-500")}>
                {trend.isPositive ? "Growing" : "Declining"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlertFeedCard({ alerts }: { alerts: LocalAlert[] }) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-500/30 bg-red-500/10 text-red-400";
      case "warning": return "border-orange-500/30 bg-orange-500/10 text-orange-400";
      default: return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertCircle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-full">
      <div className="flex items-center justify-between mb-4 text-white">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </div>
          <h3 className="font-semibold text-white">Live Alerts</h3>
        </div>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={cn("p-3 rounded-xl border flex gap-3", getSeverityStyles(alert.severity))}>
            <div className="mt-0.5">{getIcon(alert.severity)}</div>
            <div>
              <div className="font-medium text-sm text-white">{alert.title}</div>
              <div className="text-xs mt-1 text-white/70">{alert.description}</div>
              <div className="text-[10px] mt-2 font-medium uppercase tracking-wider opacity-60">
                {alert.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
