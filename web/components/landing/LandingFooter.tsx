import { Logo } from "./Logo";

const links = [
  { href: "#marketplace", label: "Marketplace" },
  { href: "#mentors", label: "Mentors" },
  { href: "#questions", label: "Q&A" },
  { href: "/login", label: "Sign in" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-white/30">
        © {new Date().getFullYear()} ShareSpace. Student exchange for campus
        communities.
      </p>
    </footer>
  );
}
