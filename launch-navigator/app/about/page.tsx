import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { FileText, Shield, BarChart3, ArrowRight, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
              Our Story
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
              We help businesses navigate complexity with confidence.
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              BizMap was founded to simplify the journey from idea to operational excellence. We combine strategic planning with practical tools so founders and business leaders can focus on growth—not paperwork.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="text-4xl font-bold text-text-dark">Our Mission</h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                To empower every business leader with the clarity, compliance, and operational framework needed to launch and scale successfully—without the overwhelm.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { icon: Target, text: "Strategic clarity for every decision" },
                  { icon: Users, text: "Built for teams that move fast" },
                  { icon: Award, text: "Trusted by industry leaders" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-text-secondary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg h-96 relative">
                <Image
                  src="/images/coffeeshop.jpg"
                  alt="Professional team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-text-dark text-center mb-16">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Compliance First", desc: "Stay ahead of regulatory requirements with automated tracking." },
              { icon: Shield, title: "Trust & Integrity", desc: "We build tools that protect your business and reputation." },
              { icon: BarChart3, title: "Data-Driven Growth", desc: "Make decisions backed by real-time insights and analytics." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark">{item.title}</h3>
                <p className="mt-4 text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-dark">Ready to get started?</h2>
          <p className="mt-6 text-lg text-text-secondary">
            Join leading companies that trust BizMap for strategic guidance.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                Get Started <ArrowRight className="h-4 w-4 inline ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-border text-text-dark hover:bg-secondary rounded-full px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
