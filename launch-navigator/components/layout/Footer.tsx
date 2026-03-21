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
    <footer className="border-t border-white/10 bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                <Rocket className="size-5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white">BizMap</span>
            </Link>
            <p className="mt-4 max-w-md text-white/50 text-sm leading-relaxed">
              Professional guidance for business formation, compliance execution, and operational readiness.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {/* Social icons */}
              {[
                { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { label: "GitHub", path: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" },
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-white/30 hover:text-cyan-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</p>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Account</p>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Legal</p>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} BizMap. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Crafted with precision for ambitious founders.
          </p>
        </div>
      </div>
    </footer>
  );
}
