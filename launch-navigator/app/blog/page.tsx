"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    slug: "launching-your-business-checklist",
    title: "The Complete Checklist for Launching Your Business",
    excerpt: "A step-by-step guide to ensure you've covered every requirement before opening your doors.",
    date: "Feb 28, 2025",
    category: "Launch",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    slug: "compliance-best-practices",
    title: "Compliance Best Practices for Growing Companies",
    excerpt: "How to stay ahead of regulatory changes and avoid costly fines as you scale.",
    date: "Feb 20, 2025",
    category: "Compliance",
    color: "from-orange-400 to-orange-600",
  },
  {
    slug: "business-formation-guide",
    title: "Business Formation: LLC vs Corporation vs Sole Proprietorship",
    excerpt: "Understanding the pros and cons of each structure to make the right choice.",
    date: "Feb 12, 2025",
    category: "Planning",
    color: "from-teal-400 to-teal-600",
  },
  {
    slug: "document-management-tips",
    title: "5 Document Management Tips Every Founder Needs",
    excerpt: "Keep your permits, licenses, and contracts organized from day one.",
    date: "Feb 5, 2025",
    category: "Operations",
    color: "from-amber-400 to-amber-600",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <PageHero
        badge="Insights & Resources"
        titleAccent="The BizMap"
        title="Blog"
        description="Practical advice on business formation, compliance, and operational excellence from our team."
      />

      {/* Blog Posts Grid */}
      <section className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <article className="group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 h-full flex flex-col">
                  <span
                    className={`inline-block self-start px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${post.color} text-white mb-5`}
                  >
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2 text-sm text-white/30">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5" />
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">Stay in the loop</h2>
          <p className="text-lg text-white/50 mb-10">
            Get the latest insights delivered to your inbox.
          </p>
          <Link href="/signup">
            <motion.button
              className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe to Updates <ArrowRight className="h-4 w-4 inline ml-2" />
            </motion.button>
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
