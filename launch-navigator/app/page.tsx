import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Rocket,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
  Building2,
  Store,
  Hammer,
  Heart,
  Truck,
  Laptop,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-slate-900">LaunchNavigator</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Start Your Business
              <span className="text-primary"> the Right Way</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600">
              Navigate the complex world of business formation, compliance, and regulations with guided checklists tailored to your industry and location.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Start Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything You Need to Launch
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We guide you through every step of starting and running your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Smart Checklists
              </h3>
              <p className="text-slate-600">
                Get personalized task lists based on your state, industry, and business type.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Compliance Tracking
              </h3>
              <p className="text-slate-600">
                Never miss a deadline with automated license and permit expiration reminders.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Progress Tracking
              </h3>
              <p className="text-slate-600">
                Stay organized with visual progress tracking and milestone celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Industries */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Support for Multiple Industries
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Tailored guidance for various business types across all 50 states
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Store, label: "Retail" },
              { icon: Rocket, label: "Restaurant" },
              { icon: Hammer, label: "Construction" },
              { icon: Heart, label: "Healthcare" },
              { icon: Laptop, label: "Technology" },
              { icon: Building2, label: "Manufacturing" },
              { icon: Truck, label: "Transportation" },
              { icon: Shield, label: "Consulting" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-slate-200 card-hover"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-slate-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Launch Your Business?
          </h2>
          <p className="mt-4 text-xl text-primary-foreground/80">
            Join thousands of entrepreneurs who have successfully started their businesses with LaunchNavigator.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-slate-900">
                LaunchNavigator
              </span>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} LaunchNavigator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
