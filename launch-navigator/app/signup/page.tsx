"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Sign up without email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: "",
            state: "",
            city: "",
            business_type: "",
          }
        }
      });

      if (error) throw error;

      // If user is created immediately (auto-confirm), redirect to onboarding
      if (data.user) {
        router.push("/onboarding");
      } else {
        // Otherwise show success message
        alert("Please check your email to verify your account, then login.");
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 to-white flex items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Brand + copy (hidden on very small screens) */}
        <div className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-lg font-bold">B</span>
            </div>
            <span className="text-2xl font-bold text-primary">BizMap</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
            Start your BizMap<br />journey in minutes.
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-md">
            Create your account to get a personalized roadmap for your state, industry, and business type.
          </p>
        </div>

        {/* Right: Auth card */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              <span className="text-lg font-bold text-primary">BizMap</span>
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-primary px-3 py-1 rounded-full border border-border/60 bg-white/60"
              >
                Back to home
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-text-dark">Create your account</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Get your customized business checklist.
                  </p>
                </div>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="hidden lg:inline-flex text-xs rounded-full px-4 py-1 border-border"
                  >
                    Back to home
                  </Button>
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full h-11"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-text-secondary">Already have an account? </span>
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
