// Database types for LaunchNavigator

export type SubscriptionPlan = 'free' | 'pro';

export type BusinessType =
  | 'restaurant'
  | 'retail'
  | 'construction'
  | 'healthcare'
  | 'manufacturing'
  | 'technology'
  | 'consulting'
  | 'fitness'
  | 'salon'
  | 'auto_repair'
  | 'general';

export interface Profile {
  id: string;
  name: string | null;
  state: string;
  city: string;
  business_type: BusinessType;
  subscription_plan: SubscriptionPlan;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  state: string;
  business_type: BusinessType;
  cost_estimate: string;
  timeline_estimate: string;
  required_documents: string[];
  official_link: string | null;
  category: string;
  order: number;
}

export interface UserTask {
  id: string;
  user_id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
  task?: Task;
}

export interface License {
  id: string;
  user_id: string;
  license_name: string;
  expiration_date: string;
  renewal_frequency: string;
  notes: string | null;
  created_at: string;
}

export interface Inspection {
  id: string;
  user_id: string;
  inspection_type: string;
  last_inspection_date: string | null;
  next_inspection_estimate: string | null;
  notes: string | null;
  created_at: string;
}

// Dashboard stats
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  upcomingDeadlines: number;
  complianceAlerts: number;
}

// Task categories
export type TaskCategory =
  | 'legal'
  | 'registration'
  | 'permits'
  | 'insurance'
  | 'tax'
  | 'compliance'
  | 'operations';

// US States for dropdown
export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
] as const;

// Business types for dropdown
export const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'construction', label: 'Construction' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'technology', label: 'Technology' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'fitness', label: 'Fitness/Gym' },
  { value: 'salon', label: 'Salon/Spa' },
  { value: 'auto_repair', label: 'Auto Repair' },
  { value: 'general', label: 'General Business' },
];
