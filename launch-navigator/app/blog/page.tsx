import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    slug: "launching-your-business-checklist",
    title: "The Complete Checklist for Launching Your Business",
    excerpt: "A step-by-step guide to ensure you've covered every requirement before opening your doors.",
    date: "Feb 28, 2025",
    category: "Launch",
  },
  {
    slug: "compliance-best-practices",
    title: "Compliance Best Practices for Growing Companies",
    excerpt: "How to stay ahead of regulatory changes and avoid costly fines as you scale.",
    date: "Feb 20, 2025",
    category: "Compliance",
  },
  {
    slug: "business-formation-guide",
    title: "Business Formation: LLC vs Corporation vs Sole Proprietorship",
    excerpt: "Understanding the pros and cons of each structure to make the right choice.",
    date: "Feb 12, 2025",
    category: "Planning",
  },
  {
    slug: "document-management-tips",
    title: "5 Document Management Tips Every Founder Needs",
    excerpt: "Keep your permits, licenses, and contracts organized from day one.",
    date: "Feb 5, 2025",
    category: "Operations",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
            Insights & Resources
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight max-w-3xl">
            The BizMap Blog
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl">
            Practical advice on business formation, compliance, and operational excellence from our team.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all hover:border-primary/20"
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-primary mb-4">
                  {post.category}
                </span>
                <h2 className="text-2xl font-semibold text-text-dark group-hover:text-primary transition">
                  {post.title}
                </h2>
                <p className="mt-4 text-text-secondary line-clamp-2">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-dark">Stay in the loop</h2>
          <p className="mt-6 text-lg text-text-secondary">
            Get the latest insights delivered to your inbox.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                Subscribe to Updates <ArrowRight className="h-4 w-4 inline ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
