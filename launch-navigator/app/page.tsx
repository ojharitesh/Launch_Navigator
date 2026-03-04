"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  Rocket,
  Shield,
  FileText,
  BarChart3,
  ArrowRight,
  CircleCheckBig,
} from "lucide-react";

const serviceItems = [
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

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-50px" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/40 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
                Professional Business Guidance
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
                Navigate business complexity with confidence.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
                Strategic guidance and operational clarity for founders and business leaders. We help you manage compliance, streamline launches, and scale sustainably.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-border text-text-dark hover:bg-secondary rounded-full px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-6 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="rounded-full overflow-hidden shadow-2xl h-96 relative">
                  <Image
                    src="/images/professional.jpg"
                    alt="Professional woman with tablet in business setting"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Companies & Reviews */}
      <section className="py-16 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-xs font-semibold text-text-muted mb-12 uppercase tracking-wider"
            {...fadeInUp}
          >
            Trusted by leading companies
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              {
                company: "TechStartup Inc.",
                review: "BizMap made opening our business incredibly easy. The step-by-step roadmap guided us through every requirement without confusion.",
                author: "Sarah Chen",
                role: "CEO",
              },
              {
                company: "Verde Consulting",
                review: "We avoided costly fines thanks to BizMap's documentation system. Every compliance requirement is tracked and current.",
                author: "Marcus Johnson",
                role: "Operations Director",
              },
              {
                company: "Growth Partners LLC",
                review: "The roadmap feature simplified our entire business launch. What would've taken months took weeks with clear milestones.",
                author: "Elena Rodriguez",
                role: "Founder",
              },
              {
                company: "NextGen Services",
                review: "Organized documentation is our biggest win. No more lost permits or missed deadlines—everything is in order.",
                author: "David Park",
                role: "Business Manager",
              },
              {
                company: "Innovate Labs",
                review: "BizMap saved us from potential fines with automated compliance reminders. Peace of mind starting day one.",
                author: "Amanda Foster",
                role: "Project Lead",
              },
              {
                company: "Strategic Solutions Co.",
                review: "The easy-to-follow roadmap and document management system made launching new ventures straightforward and risk-free.",
                author: "Robert Williams",
                role: "Managing Partner",
              },
            ].map((item) => (
              <motion.div
                key={item.company}
                className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="text-sm text-text-secondary mb-4 italic">&quot;{item.review}&quot;</p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-text-dark">{item.author}</p>
                  <p className="text-xs text-text-muted">
                    {item.role}, <span className="font-medium">{item.company}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-16 max-w-2xl" {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-dark">
              Streamlined operations from day one.
            </h2>
            <p className="mt-6 text-lg text-text-secondary">
              Our platform combines strategic planning with operational execution, giving you the clarity and control to scale confidently.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-12 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {serviceItems.map((item) => (
              <motion.div
                key={item.title}
                className="col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-text-dark">{item.title}</h3>
                <p className="mt-4 text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div className="col-span-12 lg:col-span-6" {...fadeInUp}>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-dark">
                Built for modern business leaders.
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                Whether you&apos;re launching a new venture, managing compliance, or scaling operations, BizMap provides the strategic framework and operational tools you need.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Regulatory compliance tracking",
                  "Business launch planning",
                  "Team collaboration tools",
                  "Performance analytics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="inline-block mt-8">
                <Button size="lg" variant="outline" className="border-2 border-border text-text-dark hover:bg-white rounded-full px-8">
                  View All Services <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-full overflow-hidden shadow-lg h-80 relative">
                <Image
                  src="/images/business-owner.jpg"
                  alt="Business owner ready to launch"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 lg:py-32 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-dark">
            Ready to take control of your business strategy?
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Join leading companies that trust BizMap for strategic guidance and operational excellence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-border text-text-dark hover:bg-secondary rounded-full px-8">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
