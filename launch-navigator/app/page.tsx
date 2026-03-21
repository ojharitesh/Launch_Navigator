"use client";

import Link from "next/link";
import Image from "next/image";
import ShaderShowcase from "@/components/ui/hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  FileText,
  Shield,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Zap,
  Users,
  Globe,
  Star,
  Quote,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Checklists",
    description: "Step-by-step guidance tailored to your business type, industry, and state requirements.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Automated deadline alerts for licenses, permits, inspections, and renewal dates.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    description: "Visual roadmap of every launch milestone so you always know where you stand.",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Answer a few questions and get a personalized action plan in under 2 minutes.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite partners, advisors, and team members to collaborate on your launch plan.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: Globe,
    title: "State-Specific Rules",
    description: "Regulations differ by state. BizMap knows the rules for all 50 states.",
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
];

const stats = [
  { value: "500+", label: "Businesses Launched" },
  { value: "50", label: "States Covered" },
  { value: "98%", label: "Compliance Rate" },
  { value: "24hr", label: "Avg. Response Time" },
];

const reviews = [
  {
    name: "Sarah Chen",
    role: "Founder, Bloom Café",
    rating: 5,
    text: "BizMap saved me weeks of research. I had no idea how many permits I needed for a food business in California. The checklist laid everything out perfectly.",
    image: "/images/coffeeshop.jpg",
  },
  {
    name: "Marcus Johnson",
    role: "CEO, TechBridge Solutions",
    rating: 5,
    text: "As a first-time founder, the compliance tracking alone is worth it. I never miss a filing deadline now. It's like having a business attorney on speed dial.",
    image: "/images/professional.jpg",
  },
  {
    name: "Priya Patel",
    role: "Owner, Evergreen Wellness",
    rating: 5,
    text: "The state-specific guidance was a game changer. Every state has different rules and BizMap knew exactly what I needed in Pennsylvania. Highly recommend.",
    image: "/images/business-owner.jpg",
  },
];

const steps = [
  { num: "01", title: "Tell us about your business", desc: "Answer a few quick questions about your industry, location, and business structure." },
  { num: "02", title: "Get your roadmap", desc: "Receive a personalized checklist of every license, permit, and registration you need." },
  { num: "03", title: "Launch with confidence", desc: "Follow the steps, track your progress, and open your doors knowing you're fully compliant." },
];

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section — full viewport */}
      <ShaderShowcase />

      {/* Trusted By / Stats Bar */}
      <section className="relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/40 mt-2 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to launch
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From business formation to compliance tracking — one platform to handle it all.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="group rounded-2xl p-7 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 h-full">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10`}>
                    <item.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three steps to launch
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              No more guesswork. BizMap walks you through every step.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.15}>
                <div className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-white/20 to-transparent" />
                  )}
                  <div className="text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 mb-6">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Image Section */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Why BizMap</p>
              <h2 className="text-4xl font-bold text-white mb-6">
                Built by founders, for founders.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                We&apos;ve been through the painful process of launching a business ourselves. That&apos;s why we built BizMap — to make it simple for everyone.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Personalized for your state & industry",
                  "Updated with latest regulatory changes",
                  "Used by 500+ businesses across the US",
                  "Free to start, no credit card required",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-400" />
                    <span className="text-white/70">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/signup">
                <motion.button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free <ArrowRight className="h-4 w-4 inline ml-2" />
                </motion.button>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 h-96 relative">
                  <Image
                    src="/images/business-owner.jpg"
                    alt="Business owner planning"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                {/* Floating stats card */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">98% Success Rate</p>
                      <p className="text-white/40 text-xs">Full compliance at launch</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by founders
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from business owners who launched with BizMap.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.name} delay={i * 0.12}>
                <div className="group rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 h-full flex flex-col">
                  {/* Quote icon */}
                  <Quote className="h-8 w-8 text-cyan-400/30 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-white/60 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{review.name}</p>
                      <p className="text-white/40 text-xs">{review.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Get Started Today</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to launch your business the right way?
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
            Join hundreds of founders who trust BizMap to navigate the complex world of business formation and compliance.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <motion.button
                className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free <ArrowRight className="h-4 w-4 inline ml-2" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-10 py-4 rounded-full bg-transparent border-2 border-white/20 text-white font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 cursor-pointer backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to Us
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
