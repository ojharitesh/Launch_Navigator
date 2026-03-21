"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
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
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Shield,
    title: "Business Planning",
    description: "Structured guidance for business formation, licensing, and market entry.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress and optimize your operational strategy with real-time insights.",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
];

const features = [
  "Regulatory compliance tracking",
  "Business launch planning",
  "Team collaboration tools",
  "Performance analytics",
];

const capabilities = [
  { icon: CalendarCheck, title: "Deadline Management", desc: "Never miss a filing or renewal date." },
  { icon: Gauge, title: "Progress Tracking", desc: "Visual roadmaps for every launch phase." },
  { icon: Briefcase, title: "Document Storage", desc: "Organized, secure, and always accessible." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <PageHero
        badge="What We Offer"
        titleAccent="Built for modern"
        title="business leaders."
        description="Whether you're launching a new venture, managing compliance, or scaling operations, BizMap provides the strategic framework and operational tools you need."
      />

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Our Services</p>
            <h2 className="text-4xl font-bold text-white">Core Offerings</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="group rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 h-full">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10`}>
                    <item.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Features</p>
              <h2 className="text-4xl font-bold text-white mb-6">
                Everything you need to launch and scale.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                From formation to compliance to growth—we&apos;ve got you covered with tools designed for real-world business challenges.
              </p>
              <ul className="space-y-4">
                {features.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <CircleCheckBig className="h-5 w-5 shrink-0 text-cyan-400" />
                    <span className="text-white/70">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-80 relative">
                <Image
                  src="/images/business-owner.jpg"
                  alt="Business owner ready to launch"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Additional Capabilities */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">More Tools</p>
            <h2 className="text-4xl font-bold text-white">Additional Capabilities</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 mb-5">
                    <item.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5" />
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to streamline your operations?</h2>
          <p className="text-lg text-white/50 mb-10">
            Get started with BizMap and take control of your business strategy.
          </p>
          <Link href="/signup">
            <motion.button
              className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free <ArrowRight className="h-4 w-4 inline ml-2" />
            </motion.button>
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
