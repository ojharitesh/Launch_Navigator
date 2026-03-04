import Link from "next/link";
import { Rocket } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  account: [
    { href: "/signup", label: "Sign up" },
    { href: "/login", label: "Log in" },
  ],
  legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6">
            <Link href="/" className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">BizMap</span>
            </Link>
            <p className="mt-4 max-w-md text-text-secondary">
              Professional guidance for business formation, compliance execution, and operational readiness.
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="text-sm font-semibold text-text-dark">Company</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-dark">Account</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-dark">Legal</p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} BizMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
