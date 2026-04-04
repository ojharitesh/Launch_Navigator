"use client";

import { useEffect, useState } from "react";
import { getExtendedMockInsights, BusinessChange, LocalNews } from "@/data/mock-insights";
import { createClient } from "@/lib/supabase";
import { Profile } from "@/types";
import { SpendingChart } from "@/components/dashboard/charts/SpendingChart";
import { AlertFeedCard, NewsFeedCard, SpendingTrendsCard } from "@/components/dashboard/InsightCards";
import { History, Target, ArrowUpRight, ArrowDownRight, Store } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom UI for the Intelligence page
function CompetitorRadarCard({ changes }: { changes: BusinessChange[] }) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "opened": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "closed": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "expanding": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "opened": return <ArrowUpRight className="h-4 w-4" />;
      case "closed": return <ArrowDownRight className="h-4 w-4" />;
      case "expanding": return <Store className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-full">
      <div className="flex items-center gap-2 mb-6 text-white">
        <Target className="h-5 w-5 text-orange-400" />
        <h3 className="font-semibold">Competitor Radar</h3>
        <span className="text-xs ml-auto text-white/40">Local Area</span>
      </div>
      <div className="space-y-4">
        {changes.map((change) => (
          <div key={change.id} className="flex items-start justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
            <div>
              <div className="font-medium text-white">{change.name}</div>
              <div className="text-xs text-white/50 mt-1">{change.type} · {change.location}</div>
            </div>
            <div className={cn("px-2.5 py-1 rounded-full border text-xs font-semibold flex items-center gap-1", getActionColor(change.action))}>
              {getActionIcon(change.action)}
              <span className="capitalize">{change.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryFeedCard({ news }: { news: LocalNews[] }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-full">
      <div className="flex items-center gap-2 mb-6 text-white">
        <History className="h-5 w-5 text-purple-400" />
        <h3 className="font-semibold">Historical Archive</h3>
      </div>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] last:before:bottom-0 before:w-px before:bg-white/10">
            <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-purple-400/50" />
            </div>
            <div>
              <div className="text-xs font-medium text-purple-400 mb-1">{item.timeAgo}</div>
              <div className="text-sm text-white/90 font-medium leading-relaxed">{item.title}</div>
              <div className="text-xs text-white/40 mt-1">{item.source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntelligencePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [insights, setInsights] = useState<ReturnType<typeof getExtendedMockInsights> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        setProfile(profileData);
        setInsights(getExtendedMockInsights(profileData?.state || "your state", profileData?.business_type || "general"));
      } else {
        setInsights(getExtendedMockInsights("your state", "general"));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !insights) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Local Intelligence Hub</h1>
        <p className="text-white/50">
          Deep dive into historical trends, competitor actions, and market movement in {profile?.state || "your state"}.
        </p>
      </div>

      {/* Top Section: Macro Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SpendingChart data={insights.chartData} />
        </div>
        <div className="lg:col-span-1">
          <SpendingTrendsCard trends={insights.trends} />
        </div>
      </div>

      {/* Middle Section: Competitors & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CompetitorRadarCard changes={insights.competitorChanges} />
        <AlertFeedCard alerts={insights.alerts} />
      </div>

      {/* Bottom Section: News & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsFeedCard news={insights.news} />
        <HistoryFeedCard news={insights.historicalNews} />
      </div>
    </div>
  );
}
