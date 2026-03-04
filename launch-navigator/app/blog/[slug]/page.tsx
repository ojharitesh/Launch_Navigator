import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <article className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-primary mb-4">
            Article
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
            {title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-text-muted">
            <Calendar className="h-4 w-4" />
            March 1, 2025
          </p>
          <div className="mt-12 prose prose-lg max-w-none text-text-secondary">
            <p>
              This is a placeholder for the blog post. In a full implementation, you would fetch
              the post content from a CMS or database based on the slug.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="mt-12">
            <Link href="/blog">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Posts
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
