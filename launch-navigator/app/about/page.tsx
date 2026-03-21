"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { FileText, Shield, BarChart3, ArrowRight, Target, Users, Award } from "lucide-react";

const values = [
  { icon: FileText, title: "Compliance First", desc: "Stay ahead of regulatory requirements with automated tracking." },
  { icon: Shield, title: "Trust & Integrity", desc: "We build tools that protect your business and reputation." },
  { icon: BarChart3, title: "Data-Driven Growth", desc: "Make decisions backed by real-time insights and analytics." },
];

const missionPoints = [
  { icon: Target, text: "Strategic clarity for every decision" },
  { icon: Users, text: "Built for teams that move fast" },
  { icon: Award, text: "Trusted by industry leaders" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <PageHero
        badge="Our Story"
        titleAccent="Navigate complexity"
        title="with confidence."
        description="BizMap was founded to simplify the journey from idea to operational excellence. We combine strategic planning with practical tools so founders and business leaders can focus on growth—not paperwork."
      />

      {/* Mission Section */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                To empower every business leader with the clarity, compliance, and operational framework needed to launch and scale successfully—without the overwhelm.
              </p>
              <div className="space-y-6">
                {missionPoints.map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                      <item.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-96 relative">
                <Image
                  src="/images/coffeeshop.jpg"
                  alt="Professional team collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Our Values</p>
            <h2 className="text-4xl font-bold text-white">What We Stand For</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="group rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 h-full">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10">
                    <item.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5" />
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-lg text-white/50 mb-10">
            Join leading companies that trust BizMap for strategic guidance.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <ArrowRight className="h-4 w-4 inline ml-2" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-full bg-transparent border-2 border-white/20 text-white font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 cursor-pointer backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
