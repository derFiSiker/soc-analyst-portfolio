import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, ArrowRight, CheckCircle, Calendar, BookOpen, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { projects } from "@/lib/projects";

/**
 * Home Page - SOC Analyst Portfolio
 * Modern cybersecurity dashboard design with Dark theme and Cyan/Blue accents
 * Sections: Hero, About, Portfolio, Homelab, Learning Journey, Contact
 */
export default function Home() {
  const seoTitle = "DerFisiker - Junior SOC Analyst Portfolio";
  const seoDescription = "Junior SOC Analyst portfolio showcasing hands-on cybersecurity detection skills, homelab environment, and documented attack analysis projects.";
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderEmail = String(formData.get("email") ?? "");

    formData.set("_subject", "Neue Portfolio-Anfrage von DerFisiker");
    formData.set("_replyto", senderEmail);
    formData.set("_captcha", "false");
    formData.set("_template", "table");
    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/derfisiker@proton.me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) {
        throw new Error("Formularversand fehlgeschlagen");
      }

      setFormStatus("success");
      setFormMessage("Ihre Nachricht wurde erfolgreich gesendet. Vielen Dank für Ihre Kontaktaufnahme.");
      form.reset();
    } catch {
      setFormStatus("error");
      setFormMessage("Der Versand ist momentan nicht möglich. Bitte schreiben Sie direkt an derfisiker@proton.me.");
    }
  };

  const learningPath = [
    {
      date: "13.01.2026",
      title: "IHK Certification",
      description: "System Integration Specialist (IHK) - Erfolgreich bestanden",
      status: "completed",
    },
    {
      date: "Q1 2026",
      title: "TryHackMe Pre-SOC",
      description: "Completed foundational SOC training",
      status: "completed",
    },
    {
      date: "Q1 2026",
      title: "SOC101 Course",
      description: "Security Operations Center fundamentals - Completed",
      status: "completed",
    },
    {
      date: "11.09.2026",
      title: "CompTIA Network+",
      description: "Prüfungstermin für Netzwerk- und Sicherheitsgrundlagen",
      status: "planned",
    },
  ];

  const skills = [
    "SIEM (Wazuh, Splunk, ELK)",
    "Log Analysis",
    "Threat Detection",
    "Incident Response",
    "Windows Event Logs",
    "Network Monitoring",
    "Active Directory",
    "PowerShell",
    "Malware Analysis",
    "Vulnerability Assessment",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image="https://d2xsxph8kpxj0f.cloudfront.net/310419663029875118/56ewmGu8xPTkUERM6TU3ta/hero-soc-analyst-iqXYDZ29sfYAqmnybkKan4.webp"
        url="https://soc-analyst-portfolio.manus.space"
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663029875118/56ewmGu8xPTkUERM6TU3ta/hero-soc-analyst-iqXYDZ29sfYAqmnybkKan4.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    <span className="text-accent">DerFisiker</span>
                  </h1>
                  <p className="text-2xl text-foreground/80 font-medium">
                    Junior SOC Analyst | System Integration Specialist (IHK 2026)
                  </p>
                </div>

                <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                  I build practical cybersecurity detection skills through hands-on SOC simulations, homelab environments and documented attack analysis.
                </p>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className="status-badge status-active">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    Actively seeking Junior SOC Analyst position
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#portfolio"
                    className="cyber-button inline-flex items-center gap-2"
                  >
                    View Portfolio
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="#contact-form"
                    className="px-6 py-2 rounded-lg font-medium border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    Get in Touch
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/derfisiker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-accent transition-colors"
                    title="GitHub"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/marco-l%C3%BCtkem%C3%BCller-53b0063ab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-accent transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg blur-3xl"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-accent/30 rounded-lg p-8 glass-effect">
                    <div className="space-y-4 font-mono text-sm text-accent">
                      <div>&gt; whoami</div>
                      <div className="text-foreground/60">DerFisiker@SOC-Lab</div>
                      <div>&gt; cat skills.txt</div>
                      <div className="text-foreground/60">
                        SIEM | Log Analysis | Threat Detection | IR
                      </div>
                      <div>&gt; status</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-foreground/60">Ready for opportunities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t border-border">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-accent">About Me</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  I'm a motivated cybersecurity professional transitioning from System Integration into the Blue Team. With a strong foundation in IT infrastructure and a passion for security operations, I'm building expertise in detection engineering, threat analysis, and incident response.
                </p>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  My approach combines hands-on lab work with documented case studies. I believe in learning through practical application—building detection rules, analyzing real attack scenarios, and continuously improving my detection capabilities.
                </p>

                <div className="space-y-3">
                  <h3 className="font-bold text-accent text-lg">Key Focus Areas & Administrator Tätigkeiten</h3>
                  <ul className="space-y-2">
                    {[
                      "Systemintegration & IT-Infrastruktur Management",
                      "Active Directory & Windows Server Administration",
                      "Gruppenrichtlinien, DNS, DHCP & Microsoft-365-Administration",
                      "Blue Team Operations & SOC Workflows",
                      "SIEM Configuration & Log Analysis (Wazuh, Splunk)",
                      "Netzwerkmonitoring, Firewall & Security Hardening",
                      "Patch- und Update-Management sowie Endpoint-Security",
                      "Incident Response, 2nd-Level-Support & Threat Detection",
                      "Technische Dokumentation, Changes & IT-Projektunterstützung",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground/80">
                        <CheckCircle size={18} className="text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="cyber-card">
                <h3 className="font-bold text-accent text-lg mb-6">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/20 text-accent rounded-lg text-sm font-medium border border-primary/40 hover:border-accent hover:bg-accent/10 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 border-t border-border">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-accent">SOC Portfolio</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="cyber-card group flex h-full flex-col cursor-pointer"
                >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="min-h-[3.5rem] font-bold text-lg group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-1">{project.category}</p>
                      </div>
                      <Zap size={20} className="text-accent flex-shrink-0" />
                    </div>

                    <p className="min-h-[3rem] text-foreground/70 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-foreground/50 flex items-center gap-1">
                        <Calendar size={14} />
                        {project.date}
                      </span>
                      <span className="text-accent font-medium group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Homelab Section */}
        <section id="homelab" className="py-20 border-t border-border">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-accent">Homelab Environment</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  My homelab is a practical learning environment where I simulate real-world SOC scenarios and test detection capabilities. It includes enterprise-grade tools and infrastructure for hands-on security research.
                </p>

                <div className="space-y-4">
                  <h3 className="font-bold text-accent text-lg">Architecture Components</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Active Directory", desc: "Domain Controller & User Management" },
                      { name: "Windows Clients", desc: "3x Windows 10 endpoints for testing" },
                      { name: "Kali Linux", desc: "Attack platform for simulations" },
                      { name: "Wazuh SIEM", desc: "Central log aggregation & analysis" },
                      { name: "ELK Stack", desc: "Elasticsearch, Logstash, Kibana" },
                      { name: "Suricata IDS", desc: "Network intrusion detection" },
                    ].map((component, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">{component.name}</p>
                          <p className="text-sm text-foreground/60">{component.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <h3 className="font-bold text-accent text-lg mb-6">Architecture Diagram</h3>
                <div
                  className="w-full h-80 rounded-lg border border-border bg-background/50 flex items-center justify-center"
                  style={{
                    backgroundImage:
                      "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663029875118/56ewmGu8xPTkUERM6TU3ta/homelab-architecture-W9bgWfXedVzMnbjBEzvZdZ.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-background/40 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Journey Section */}
        <section id="learning" className="py-20 border-t border-border">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-accent">Learning Journey</h2>

            <div className="max-w-3xl">
              <div className="space-y-6">
                {learningPath.map((milestone, idx) => (
                  <div key={idx} className="flex gap-6">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          milestone.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : milestone.status === "in-progress"
                              ? "bg-accent border-accent animate-pulse"
                              : "bg-transparent border-foreground/30"
                        }`}
                      ></div>
                      {idx < learningPath.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-border to-transparent mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <p className="text-sm text-accent font-mono font-bold">{milestone.date}</p>
                      <h3 className="text-xl font-bold mt-2">{milestone.title}</h3>
                      <p className="text-foreground/70 mt-2">{milestone.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            milestone.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : milestone.status === "in-progress"
                                ? "bg-accent/20 text-accent"
                                : "bg-foreground/10 text-foreground/60"
                          }`}
                        >
                          {milestone.status === "completed"
                            ? "✓ Completed"
                            : milestone.status === "in-progress"
                              ? "◆ In Progress"
                              : "○ Planned"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section with Functional Form */}
        <section id="contact" className="py-20 border-t border-border">
          <div className="container max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-accent text-center">Get in Touch</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Let's Connect</h3>
                <p className="text-foreground/70 leading-relaxed">
                  I am actively seeking Junior SOC Analyst and System Integration positions. Feel free to reach out via the contact form or directly through my professional channels.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-accent" size={20} />
                    <a href="mailto:derfisiker@proton.me" className="text-accent hover:underline">
                      derfisiker@proton.me
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="text-accent" size={20} />
                    <a href="https://linkedin.com/in/marco-l%C3%BCtkem%C3%BCller-53b0063ab" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="text-accent" size={20} />
                    <a href="https://github.com/derfisiker" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-4">
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground/80">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-foreground"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground/80">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-foreground"
                      placeholder="ihre.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground/80">Nachricht</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-foreground resize-none"
                      placeholder="Ihre Nachricht an mich..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full cyber-button py-3 text-center font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formStatus === "sending" ? "Wird gesendet ..." : "Nachricht senden"}
                  </button>
                  {formMessage && (
                    <p className={`text-sm leading-relaxed ${formStatus === "error" ? "text-red-300" : formStatus === "success" ? "text-emerald-300" : "text-foreground/70"}`} role="status">
                      {formMessage}
                    </p>
                  )}
                  <p className="text-xs text-foreground/50">
                    Der Versand erfolgt über einen externen Formularservice. Alternativ können Sie direkt an <a href="mailto:derfisiker@proton.me" className="text-accent hover:underline">derfisiker@proton.me</a> schreiben.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-foreground/70">
                Based in <span className="text-accent font-medium">Germany, NRW, Metropol Ruhr-Region</span>
              </p>
              <p className="text-foreground/60 text-sm mt-2">
                Open to opportunities in cybersecurity and SOC operations
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
