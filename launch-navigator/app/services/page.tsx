import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  Shield,
  BarChart3,
  CircleCheckBig,
  ArrowRight,
  CalendarCheck,
  Gauge,
  Briefcase,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Compliance Management",
    description: "Stay ahead of regulatory requirements with automated tracking and deadline alerts.",
  },
  {
    icon: Shield,
    title: "Business Planning",
    description: "Structured guidance for business formation, licensing, and market entry.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress and optimize your operational strategy with real-time insights.",
  },
];

const features = [
  "Regulatory compliance tracking",
  "Business launch planning",
  "Team collaboration tools",
  "Performance analytics",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
            What We Offer
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight max-w-3xl">
            Built for modern business leaders.
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl">
            Whether you&apos;re launching a new venture, managing compliance, or scaling operations, BizMap provides the strategic framework and operational tools you need.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-text-dark mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-text-dark">{item.title}</h3>
                <p className="mt-4 text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="text-4xl font-bold text-text-dark">
                Everything you need to launch and scale.
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                From formation to compliance to growth—we&apos;ve got you covered with tools designed for real-world business challenges.
              </p>
              <ul className="mt-8 space-y-4">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg h-80 relative">
                <Image
                  src="/images/business-owner.jpg"
                  alt="Business owner ready to launch"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-text-dark text-center mb-16">Additional Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CalendarCheck, title: "Deadline Management", desc: "Never miss a filing or renewal date." },
              { icon: Gauge, title: "Progress Tracking", desc: "Visual roadmaps for every launch phase." },
              { icon: Briefcase, title: "Document Storage", desc: "Organized, secure, and always accessible." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-secondary/50">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-text-dark">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-dark">Ready to streamline your operations?</h2>
          <p className="mt-6 text-lg text-text-secondary">
            Get started with BizMap and take control of your business strategy.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                Get Started Free <ArrowRight className="h-4 w-4 inline ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
