"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase";
import { US_STATES, BUSINESS_TYPES } from "@/types";
import { seedTasks } from "@/data/seed-tasks";
import { Rocket, ArrowRight, Check, Building2, MapPin, Briefcase, Info } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

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
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      // Create/update profile
      await supabase.from("profiles").upsert({
        id: user.id,
        name,
        state,
        city,
        business_type: businessType,
        subscription_plan: "free",
        updated_at: new Date().toISOString(),
      });

      const stateCode = US_STATES.find((s) => s.name === state)?.code || state;

      // Filter ALL relevant tasks
      const filteredTasks = seedTasks.filter((task) => {
        if (task.state === "general" && task.business_type === "general") return true;
        if (task.business_type === businessType) return true;
        if (task.state === stateCode) return true;
        if (task.business_type === "general") return true;
        return false;
      });

      // Create tasks and assign to user
      for (const task of filteredTasks) {
        const taskId = crypto.randomUUID();

        await supabase.from("tasks").upsert({
          id: taskId,
          title: task.title,
          description: task.description,
          detailed_steps: task.detailedSteps || [],
          state: task.state,
          business_type: task.business_type,
          cost_estimate: task.cost_estimate || "",
          cost_details: task.cost_details || "",
          timeline_estimate: task.timeline_estimate || "",
          timeline_details: task.timeline_details || "",
          required_documents: task.required_documents || [],
          official_link: task.official_link,
          category: task.category,
          order: task.order,
        }, { onConflict: "id" });

        await supabase.from("user_tasks").insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          task_id: taskId,
          completed: false,
        });
      }

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding");
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">LaunchNavigator</span>
          </div>
          <p className="text-slate-600">Let&apos;s set up your business - we&apos;ll create a personalized checklist just for you!</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? "bg-primary" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6">{error}</div>}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">What&apos;s your name?</h2>
                  <p className="text-slate-500 mt-2">This helps us personalize your experience</p>
                </div>
                <div>
                  <Label htmlFor="name" className="text-base font-medium">Your Full Name</Label>
                  <Input id="name" type="text" placeholder="e.g., John Smith" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-12 text-lg" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Where is your business located?</h2>
                  <p className="text-slate-500 mt-2">Regulations and requirements vary by state and city</p>
                </div>
                <div>
                  <Label htmlFor="state" className="text-base font-medium"> State</Label>
                  <select id="state" value={state} onChange={(e) => setState(e.target.value)} className="flex h-12 mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-lg">
                    <option value="">Select your state</option>
                    {US_STATES.map((s) => (<option key={s.code} value={s.name}>{s.name}</option>))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="city" className="text-base font-medium">City</Label>
                  <Input id="city" type="text" placeholder="e.g., San Francisco" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 h-12 text-lg" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">What type of business?</h2>
                  <p className="text-slate-500 mt-2">Each business type has different requirements</p>
                </div>
                <div>
                  <Label htmlFor="businessType" className="text-base font-medium">Business Type</Label>
                  <select id="businessType" value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="flex h-12 mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-lg">
                    <option value="">Select business type</option>
                    {BUSINESS_TYPES.map((bt) => (<option key={bt.value} value={bt.value}>{bt.label}</option>))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1 h-12">
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(step + 1)} disabled={!canProceed()} className="flex-1 h-12">
                  Continue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button type="submit" disabled={!canProceed() || loading} className="flex-1 h-12">
                  {loading ? "Setting up..." : "Complete Setup ✓"}
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">Step {step} of 3</p>
      </div>
    </div>
  );
}
