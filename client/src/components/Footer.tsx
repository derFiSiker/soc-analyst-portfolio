import { Github, Linkedin, Mail, MapPin } from "lucide-react";

/**
 * Footer Component
 * Dark cybersecurity theme with social links and contact info
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/derfisiker",
      label: "GitHub",
      color: "hover:text-accent",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/marco-l%C3%BCtkem%C3%BCller-53b0063ab",
      label: "LinkedIn",
      color: "hover:text-accent",
    },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-accent mb-4">About</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Junior SOC Analyst focused on detection engineering and incident response. Building practical cybersecurity skills through hands-on simulations and homelab environments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#portfolio" className="text-foreground/70 hover:text-accent transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/#homelab" className="text-foreground/70 hover:text-accent transition-colors">
                  Homelab
                </a>
              </li>
              <li>
                <a href="/#learning" className="text-foreground/70 hover:text-accent transition-colors">
                  Learning Journey
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-foreground/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-accent mb-4">Location</h3>
            <div className="flex items-center gap-2 text-foreground/70 text-sm">
              <MapPin size={16} className="text-accent" />
              <span>Germany, NRW, Metropol Ruhr-Region</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 pb-8 border-t border-border">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-foreground/60 ${link.color} transition-colors`}
                title={link.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-foreground/50 text-sm">
          <p>
            &copy; {currentYear} DerFisiker. All rights reserved. | SOC Analyst Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
