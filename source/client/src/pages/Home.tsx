/**
 * Signal Trace design system: a restrained SOC operations notebook with a carbon-black ground,
 * slate layers, and #B8F927 reserved for active evidence and operational status.
 */
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleDot,
  Command,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Radar,
  Send,
  Server,
  ShieldCheck,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { portfolioContent, type Language } from "@/content/portfolioContent";
import { formspreeEndpoint, hasFormspreeEndpoint, repositoryUrl } from "@/config/siteConfig";
import ProjectSection from "@/components/ProjectSection";

const githubUrl = "https://github.com/derFiSiker";
const linkedinUrl = "https://www.linkedin.com/in/marco-l%C3%BCtkem%C3%BCller-53b0063ab/";
const platformImage = "/assets/project-siem.jpg";
const stackIcons = [Terminal, ShieldCheck, Server, Server, Network, Server];

function SectionMarker({ number, label }: { number: string; label: string }) {
  return <div className="section-marker" aria-label={`Section ${number}: ${label}`}><span>{number}</span><img className="section-node" src="/assets/marco-signal-logo.png" alt="" /><i /><strong>{label}</strong></div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = window.localStorage.getItem("marco-soc-language");
    return storedLanguage === "en" || storedLanguage === "de" ? storedLanguage : "de";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error" | "setup">("idle");
  const [terminalSoundEnabled, setTerminalSoundEnabled] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([...portfolioContent.de.terminal.greeting]);
  const audioContext = useRef<AudioContext | null>(null);
  const copy = portfolioContent[language];

  useEffect(() => { window.localStorage.setItem("marco-soc-language", language); }, [language]);

  const playTerminalClick = () => {
    if (!terminalSoundEnabled) return;
    try {
      const context = audioContext.current ?? new window.AudioContext();
      audioContext.current = context;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(164 + Math.random() * 36, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.018, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(now); oscillator.stop(now + 0.035);
    } catch { /* Optional audio must never block terminal interaction. */ }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasFormspreeEndpoint()) { setFormStatus("setup"); return; }
    setFormStatus("sending");
    try {
      const response = await fetch(formspreeEndpoint, { method: "POST", body: new FormData(event.currentTarget), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Form submission failed");
      event.currentTarget.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  const switchLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage); setMenuOpen(false); setFormStatus("idle"); setTerminalInput("");
    setTerminalLines([...portfolioContent[nextLanguage].terminal.greeting]);
  };

  const handleTerminalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key.length === 1 || event.key === "Backspace" || event.key === "Enter") playTerminalClick();
  };

  const runTerminalCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") { setTerminalLines([]); setTerminalInput(""); return; }
    const response = Object.entries(copy.terminal.commands).find(([key]) => key === command)?.[1] ?? [copy.terminal.unknown];
    setTerminalLines((lines) => [...lines, `${copy.terminal.prompt} ${command}`, ...response]);
    setTerminalInput("");
  };

  const formNotice = formStatus === "sent" ? copy.contact.sent : formStatus === "error" ? copy.contact.failed : formStatus === "setup" ? copy.contact.setup : "";

  return (
    <div className="signal-site" lang={language}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={copy.brandBackToTop}><img src="/assets/marco-signal-logo.png" alt="" /><span><b>Marco</b><em>Lütkemüller</em></span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={copy.languageSwitchLabel}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>{copy.navigation.projects}</a><a href="#profile" onClick={() => setMenuOpen(false)}>{copy.navigation.profile}</a><a href="#skills" onClick={() => setMenuOpen(false)}>{copy.navigation.skills}</a><a href="#learning" onClick={() => setMenuOpen(false)}>{copy.navigation.learning}</a><a href="#contact" onClick={() => setMenuOpen(false)}>{copy.navigation.contact}</a>
        </nav>
        <div className={`language-switch ${language === "en" ? "is-en" : "is-de"}`} role="group" aria-label={copy.languageSwitchLabel}><i className="language-slider" aria-hidden="true" /><button className={language === "de" ? "is-active" : ""} onClick={() => switchLanguage("de")} aria-pressed={language === "de"}>DE</button><button className={language === "en" ? "is-active" : ""} onClick={() => switchLanguage("en")} aria-pressed={language === "en"}>EN</button></div>
        <a className="header-link" href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /><span>{copy.navigation.github}</span><ArrowUpRight size={14} /></a>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? copy.menuClose : copy.menuOpen} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-background" role="img" aria-label={copy.hero.imageLabel} /><div className="hero-grain" />
          <div className="hero-content"><div className="eyebrow"><span className="live-dot" /> {copy.hero.eyebrow}</div><h1 id="hero-title">{copy.hero.titleLines.map((line, index) => <span className={index === 1 ? "hero-highlight" : ""} key={line}>{line}{index < 2 && <br />}</span>)}</h1><p className="hero-intro">{copy.hero.intro}</p><div className="hero-actions"><a className="button button-primary" href="#projects">{copy.hero.inspect} <ArrowDown size={17} /></a><a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer"><Github size={17} /> {copy.hero.github}</a></div></div>
          <div className="telemetry-card"><div className="telemetry-head"><span>{copy.hero.telemetry.title}</span><span className="telemetry-symbol"><img src="/assets/marco-signal-logo.png" alt="" /><CircleDot size={15} /></span></div><div className="telemetry-grid"><div><span>{copy.hero.telemetry.source}</span><b>{copy.hero.telemetry.sourceValue}</b></div><div><span>{copy.hero.telemetry.siem}</span><b>{copy.hero.telemetry.siemValue}</b></div><div><span>{copy.hero.telemetry.lab}</span><b>{copy.hero.telemetry.labValue}</b></div><div><span>{copy.hero.telemetry.mode}</span><b>{copy.hero.telemetry.modeValue}</b></div></div></div>
          <div className="hero-terminal" aria-label={copy.terminal.title}><div className="terminal-topbar"><span className="terminal-lights"><i /><i /><i /></span><span>{copy.terminal.title}</span><button type="button" className={`terminal-sound ${terminalSoundEnabled ? "is-enabled" : ""}`} onClick={() => setTerminalSoundEnabled((enabled) => !enabled)} aria-pressed={terminalSoundEnabled} aria-label={terminalSoundEnabled ? copy.terminal.soundOff : copy.terminal.soundOn}>{terminalSoundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}<b>{terminalSoundEnabled ? copy.terminal.soundOn : copy.terminal.soundOff}</b></button></div><div className="terminal-output" role="log" aria-live="polite">{terminalLines.length > 0 ? terminalLines.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith(copy.terminal.prompt) ? "terminal-command" : ""}>{line}</p>) : <p className="terminal-empty">_</p>}</div><form className="terminal-input-row" onSubmit={runTerminalCommand}><span>{copy.terminal.prompt}</span><input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} onKeyDown={handleTerminalKeyDown} placeholder={copy.terminal.placeholder} aria-label={copy.terminal.placeholder} autoCapitalize="none" autoCorrect="off" spellCheck="false" /><button type="submit" aria-label="Run terminal command">↵</button></form><div className="terminal-hint"><span>{copy.terminal.available}</span><b>about · stack · projects · help</b></div></div>
          <div className="hero-stack" aria-label={copy.hero.stackLabel}>{copy.stack.map((label, index) => { const Icon = stackIcons[index]; return <div className="stack-item" key={label}><Icon size={18} /><span>{label}</span></div>; })}</div>
        </section>

        <section id="profile" className="intro-panel"><SectionMarker number="00" label={copy.profile.marker} /><div className="intro-copy"><p className="statement">{copy.profile.statement}</p><p>{copy.profile.body}</p><div className="capability-chips">{copy.profile.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></div><div className="intro-facts">{copy.profile.facts.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div></section>

        <ProjectSection projects={copy.projects} platformImage={platformImage} />

        <section className="case-studies-section" aria-label={copy.projects.casesLabel}>{copy.caseStudies.map((caseStudy, index) => <article id={`case-${caseStudy.id}`} className="case-study" key={caseStudy.id}><div className="case-study-head"><SectionMarker number={`0${index + 1}`} label={caseStudy.kind} /><a href="#projects">{copy.projects.marker} <ChevronRight size={14} /></a></div><div className="case-study-title"><h2>{caseStudy.title}</h2><p>{caseStudy.lead}</p></div><div className="case-study-grid"><section><span className="case-label">ENVIRONMENT</span><ul className="case-environment">{caseStudy.environment.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span className="case-label">{caseStudy.scenarioTitle}</span><p>{caseStudy.scenario}</p></section><section><span className="case-label">{caseStudy.methodTitle}</span><p>{caseStudy.method}</p></section><section><span className="case-label">{caseStudy.findingsTitle}</span><p>{caseStudy.findings}</p></section></div><div className="case-study-bottom"><div><span className="case-label">LESSONS LEARNED</span><ul className="case-lessons">{caseStudy.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></div><aside><span className="case-label">TOOLS</span><ul className="tag-list">{caseStudy.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></aside></div></article>)}</section>

        <section id="skills" className="content-section skills-section"><div className="section-heading skills-heading"><SectionMarker number="02" label={copy.skills.marker} /><div><h2>{copy.skills.heading[0]}<br /><i>{copy.skills.heading[1]}</i></h2><p>{copy.skills.intro}</p></div></div><div className="skill-layout"><div className="skills-matrix">{copy.skills.items.map(([category, detail, level], index) => <div className="skill-row" key={category}><div className="skill-index">0{index + 1}</div><div className="skill-label"><strong>{category}</strong><span>{detail}</span></div><div className="skill-meter" aria-label={`${category}: ${level}%`}><i style={{ width: `${level}%` }} /></div><b className="skill-level">{level}</b></div>)}</div><aside className="skills-note"><div className="note-icon"><Activity size={22} /></div><p>{copy.skills.note}</p><div><span>{copy.skills.status}</span><b><Check size={15} />{copy.skills.active}</b></div></aside></div></section>

        <section id="learning" className="learning-section"><div className="section-heading"><SectionMarker number="03" label={copy.learning.marker} /><div><h2>{copy.learning.heading[0]}<br /><i>{copy.learning.heading[1]}</i></h2><p>{copy.learning.intro}</p></div></div><div className="learning-timeline">{copy.learning.items.map((item, index) => <article className="learning-item" key={item.title}><div className="learning-node"><span>0{index + 1}</span><i /></div><div className="learning-meta"><span>{item.date}</span><b className={item.status.toLowerCase().includes("planned") || item.status.toLowerCase().includes("geplant") ? "is-planned" : ""}>{item.status}</b></div><div><h3>{item.title}</h3><p>{item.detail}</p></div><BookOpenCheck size={20} /></article>)}</div></section>

        <section id="writing" className="content-section writing-section"><div className="section-heading"><SectionMarker number="04" label={copy.writing.marker} /><div><h2>{copy.writing.heading[0]}<br /><i>{copy.writing.heading[1]}</i></h2><p>{copy.writing.intro}</p></div></div><div className="article-list">{copy.writing.items.map((article, index) => <a className="article-row" href="#contact" key={article.title}><span className="article-number">0{index + 1}</span><div><span className="article-type">{article.type}</span><h3>{article.title}</h3><p>{article.description}</p></div><span className="article-time">{article.readTime}</span><ArrowUpRight className="article-arrow" size={21} /></a>)}</div></section>
      </main>

      <footer id="contact" className="site-footer"><div className="footer-grid"><div className="footer-intro"><div className="eyebrow"><span className="live-dot" /> {copy.contact.eyebrow}</div><h2>{copy.contact.heading[0]}<br /><i>{copy.contact.heading[1]}</i></h2><p>{copy.contact.body}</p><div className="footer-location"><MapPin size={15} />{copy.contact.location}</div><div className="footer-links"><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={17} />{copy.contact.github}</a><a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={17} />{copy.contact.linkedin}</a><a href="/assets/Marco_Luetkemuller_Portfolio_CV.pdf" download><Download size={17} />{copy.contact.cv}</a></div></div><form className="contact-form" onSubmit={submitContact}><div className="form-heading"><Mail size={18} /><span>{copy.contact.formTitle}</span></div><label>{copy.contact.name}<input required name="name" placeholder={copy.contact.namePlaceholder} /></label><label>{copy.contact.email}<input required type="email" name="email" placeholder={copy.contact.emailPlaceholder} /></label><label>{copy.contact.message}<textarea required name="message" rows={4} placeholder={copy.contact.messagePlaceholder} /></label><input type="hidden" name="_subject" value="Portfolio contact request" /><button className="button button-primary form-submit" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? copy.contact.sending : copy.contact.submit} <Send size={16} /></button><p className="form-privacy">{copy.contact.privacy}</p>{formNotice && <p className={`form-note form-${formStatus}`}>{formNotice}</p>}</form></div><div className="footer-bottom"><span>© 2026 Marco Lütkemüller</span><span><Command size={13} /> {copy.footer.trace}</span><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutzerklärung</a><a href="#top">{copy.footer.back} <ArrowUpRight size={13} /></a></div></footer></div>
  );
}
