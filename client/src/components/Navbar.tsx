import { Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Design note: SOC dashboard navigation with a compact sticky header, cyan
 * interaction states, and direct hash scrolling so recruiters can reach each
 * portfolio section without depending on client-side route parsing.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Homelab", href: "#homelab" },
    { label: "Learning", href: "#learning" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (!href.startsWith("#")) {
      return;
    }

    if (window.location.pathname !== "/") {
      event.preventDefault();
      window.location.assign(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-accent hover:text-accent/80 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="DerFisiker Startseite"
        >
          <span className="text-primary">&lt;</span>
          <span>DerFisiker</span>
          <span className="text-primary">/&gt;</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className="text-foreground/80 hover:text-accent transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden text-accent hover:text-accent/80 transition-colors"
          aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="text-foreground/80 hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
