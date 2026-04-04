import { BusinessType } from "@/types";

export interface LocalNews {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: "Economy" | "Development" | "Community" | "Policy";
}

export interface SpendingTrend {
  id: string;
  category: string;
  value: number;
  isPositive: boolean;
  timeframe: string;
}

export interface LocalAlert {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  date: string;
}

// Function to get personalized mock insights based on business type
export const getMockInsights = (state: string = "your state", businessType: BusinessType | "general" = "general") => {
  const news: LocalNews[] = [
    {
      id: "news-1",
      title: `City council approves new small business grant program for ${businessType.replace('_', ' ')}s`,
      source: "Local Business Journal",
      timeAgo: "2 hours ago",
      category: "Policy",
    },
    {
      id: "news-2",
      title: "Commercial real estate prices cool down in downtown district",
      source: "Real Estate Daily",
      timeAgo: "5 hours ago",
      category: "Economy",
    },
    {
      id: "news-3",
      title: "Annual summer festival expected to bring record foot traffic",
      source: "City Gazette",
      timeAgo: "1 day ago",
      category: "Community",
    },
  ];

  const trends: SpendingTrend[] = [
    {
      id: "trend-1",
      category: "Local Spending",
      value: 8.5,
      isPositive: true,
      timeframe: "vs last month",
    },
    {
      id: "trend-2",
      category: "Material Costs",
      value: 2.1,
      isPositive: false,
      timeframe: "vs last quarter",
    },
    {
      id: "trend-3",
      category: "Consumer Foot Traffic",
      value: 12.4,
      isPositive: true,
      timeframe: "vs last year",
    },
  ];

  const alerts: LocalAlert[] = [
    {
      id: "alert-1",
      title: "Road Construction Upcoming",
      description: "Main Street will be down to one lane starting next Monday for repaving.",
      severity: "warning",
      date: "Next Monday",
    },
    {
      id: "alert-2",
      title: "Weather Advisory",
      description: "Severe thunderstorm watch issued for the metro area this evening.",
      severity: "critical",
      date: "Today, 5PM",
    },
    {
      id: "alert-3",
      title: "Tax Deadline Fast Approaching",
      description: `Quarterly state taxes for ${state} are due next week.`,
      severity: "info",
      date: "Next Week",
    },
  ];

  // Make up some chart data for the last 7 days
  const chartData = [
    { day: "Mon", value: 3200 },
    { day: "Tue", value: 3800 },
    { day: "Wed", value: 4100 },
    { day: "Thu", value: 3900 },
    { day: "Fri", value: 5200 },
    { day: "Sat", value: 6800 },
    { day: "Sun", value: 5900 },
  ];

  return { news, trends, alerts, chartData };
};

export interface BusinessChange {
  id: string;
  name: string;
  type: string;
  action: "opened" | "closed" | "expanding";
  date: string;
  location: string;
}

export const getExtendedMockInsights = (state: string = "your state", businessType: BusinessType | "general" = "general") => {
  const baseInsights = getMockInsights(state, businessType);
  
  const historicalNews: LocalNews[] = [
    {
      id: "hist-1",
      title: "Major tech firm announces plans to open regional office downtown",
      source: "Business Weekly",
      timeAgo: "2 weeks ago",
      category: "Development",
    },
    {
      id: "hist-2",
      title: "City passes new zoning laws affecting commercial properties",
      source: "Local Gazette",
      timeAgo: "1 month ago",
      category: "Policy",
    },
    {
      id: "hist-3",
      title: "Quarterly report shows unexpected boom in local retail sector",
      source: "Economy Tracker",
      timeAgo: "3 months ago",
      category: "Economy",
    },
    {
      id: "hist-4",
      title: "Infrastructure project completed ahead of schedule on 5th avenue",
      source: "City News",
      timeAgo: "4 months ago",
      category: "Development",
    },
  ];

  const competitorChanges: BusinessChange[] = [
    {
      id: "comp-1",
      name: `The New ${businessType.replace('_', ' ')} Studio`,
      type: businessType.replace('_', ' '),
      action: "opened",
      date: "Last Week",
      location: "2 Miles Away",
    },
    {
      id: "comp-2",
      name: "Downtown Essentials",
      type: "Retail",
      action: "closed",
      date: "2 Weeks Ago",
      location: "0.5 Miles Away",
    },
    {
      id: "comp-3",
      name: "Metro Logistics",
      type: "Logistics",
      action: "expanding",
      date: "1 Month Ago",
      location: "5 Miles Away",
    },
  ];

  return {
    ...baseInsights,
    historicalNews,
    competitorChanges,
  };
};
