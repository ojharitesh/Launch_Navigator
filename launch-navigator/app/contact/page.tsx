"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary/70">
            Get in Touch
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight max-w-3xl">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl">
            Have questions about BizMap? Want to schedule a demo? Reach out and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-text-dark">Email</h3>
                </div>
                <a href="mailto:ojha01@allegheny.edu" className="text-text-secondary hover:text-primary transition">
                  hello@bizmap.com
                </a>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-text-dark">Phone</h3>
                </div>
                <a href="tel:+44444444" className="text-text-secondary hover:text-primary transition">
                  +1 (443) 729-6002
                </a>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-text-dark">Office</h3>
                </div>
                <p className="text-text-secondary">
                  520 N Main St, 16335<br />
                  Meadville, PA 16335
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-secondary/30 p-8 lg:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mb-6">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-dark">Thank you!</h3>
                    <p className="mt-4 text-text-secondary">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="w-full"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          className="w-full"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-text-dark mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        className="w-full"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, subject: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your needs..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                        value={form.message}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, message: e.target.value }))
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8"
                    >
                      {submitting ? "Sending..." : "Send Message"}{" "}
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-dark">Prefer to get started right away?</h2>
          <p className="mt-4 text-text-secondary">
            Sign up for a free account and explore BizMap on your own.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-8">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
