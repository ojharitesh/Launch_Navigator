"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase";
import { US_STATES, BUSINESS_TYPES } from "@/types";
import { seedTasks } from "@/data/seed-tasks";
import { Rocket, ArrowRight, Check } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [businessType, setBusinessType] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      // Create user profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        name,
        state,
        city,
        business_type: businessType,
        subscription_plan: "free",
      });

      if (profileError) throw profileError;

      // Fetch tasks for this state and business type
      const stateCode = US_STATES.find((s) => s.name === state)?.code || state;
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .or(`state.eq.${stateCode},state.eq.general`)
        .or(`business_type.eq.${businessType},business_type.eq.general`)
        .order("order", { ascending: true });

      // If no tasks in DB, use seed data filtered by state and business type
      let tasksToAssign = tasks;
      if (!tasks || tasks.length === 0) {
        tasksToAssign = seedTasks
          .filter((task) => {
            const stateMatch = stateCode && stateCode !== "general"
              ? task.state === stateCode || task.state === "general"
              : task.state === "general";
            const typeMatch = businessType
              ? task.business_type === businessType || task.business_type === "general"
              : task.business_type === "general";
            return stateMatch && typeMatch;
          })
          .map((task, index) => ({
            id: crypto.randomUUID(),
            title: task.title,
            description: task.description,
            state: task.state,
            business_type: task.business_type,
            cost_estimate: task.cost_estimate,
            timeline_estimate: task.timeline_estimate,
            required_documents: task.required_documents,
            official_link: task.official_link,
            category: task.category,
            order: task.order || index,
          }));

        // Insert tasks into DB
        if (tasksToAssign.length > 0) {
          await supabase.from("tasks").upsert(tasksToAssign, { onConflict: "id" });
        }
      }

      // Create user tasks
      if (tasksToAssign && tasksToAssign.length > 0) {
        const userTasks = tasksToAssign.map((task) => ({
          id: crypto.randomUUID(),
          user_id: user.id,
          task_id: task.id,
          completed: false,
        }));

        await supabase.from("user_tasks").upsert(userTasks, {
          onConflict: "user_id,task_id",
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return state && city.trim().length > 0;
    if (step === 3) return businessType !== "";
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              LaunchNavigator
            </span>
          </div>
          <p className="text-slate-600">Let&apos;s set up your business profile</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${
                    step > s ? "bg-primary" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">What&apos;s your name?</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    This helps us personalize your experience
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="state">What state are you in?</Label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a state</option>
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="city">What city?</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessType">What type of business?</Label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select business type</option>
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt.value} value={bt.value}>
                        {bt.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-slate-500 mt-2">
                    We&apos;ll create a personalized checklist based on your selection
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!canProceed() || loading}
                  className="flex-1"
                >
                  {loading ? "Setting up..." : "Complete Setup"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
