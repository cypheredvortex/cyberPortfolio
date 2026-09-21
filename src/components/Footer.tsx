import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              <span className="font-mono text-primary">A</span>chraf Sghiri
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Computer Science and Networks engineering candidate specializing
              in cybersecurity and network infrastructure.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About" },
                { href: "/#skills", label: "Technical Profile" },
                { href: "/projects", label: "Projects" },
                { href: "/#experience", label: "Experience" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {profile.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} {profile.name}. Built with Next.js &amp;
            TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
