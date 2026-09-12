/**
 * Signal Trace case-study view: a focused technical dossier with an independent
 * static URL, compact navigation, and a single evidence-led reading flow.
 */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Github, Menu, ShieldCheck } from "lucide-react";
import { portfolioContent, type Language } from "@/content/portfolioContent";
import { caseRepositorySlugs, repositoryUrl } from "@/config/siteConfig";
import "./caseArtifacts.css";

const githubUrl = "https://github.com/derFiSiker";

function isRepositoryCase(id: string): id is keyof typeof caseRepositorySlugs {
  return id in caseRepositorySlugs;
}

export default function CaseStudyPage({ caseId }: { caseId: string }) {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = window.localStorage.getItem("marco-soc-language");
    return storedLanguage === "en" || storedLanguage === "de" ? storedLanguage : "de";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [caseLoading, setCaseLoading] = useState(true);
  const copy = portfolioContent[language];
  const caseStudy = copy.caseStudies.find((entry) => entry.id === caseId);
  const hasRepository = isRepositoryCase(caseId);
  const labels = language === "de"
    ? { back: "Zurück zur Übersicht", environment: "Umgebung", lessons: "Lessons Learned", tools: "Tools", scenario: "Szenario", method: "Detection-Methode", findings: "Evidenz", repository: "Repository öffnen", home: "Startseite", unavailable: "Case Study nicht gefunden", unavailableCopy: "Diese Dokumentation ist unter dieser Adresse nicht verfügbar.", menu: "Navigation öffnen", artifacts: "Evidenz-Artefakte", screenshot: "Screenshot-Slot", screenshotHint: "Bereinigten Lab-Screenshot oder Architekturansicht hier ergänzen", detection: "Detection-Artefakt", detectionHint: "Regel, Triage-Timeline oder bereinigtes Event-Beispiel hier ergänzen", loading: "Case Study wird geladen" }
    : { back: "Back to overview", environment: "Environment", lessons: "Lessons learned", tools: "Tools", scenario: "Scenario", method: "Detection method", findings: "Evidence", repository: "Open repository", home: "Home", unavailable: "Case study not found", unavailableCopy: "This documentation is not available at this address.", menu: "Open navigation", artifacts: "Evidence artifacts", screenshot: "Screenshot slot", screenshotHint: "Add a sanitized lab screenshot or architecture view here", detection: "Detection artifact", detectionHint: "Add a rule, triage timeline, or sanitized event sample here", loading: "Loading case study" };

  useEffect(() => { window.localStorage.setItem("marco-soc-language", language); }, [language]);
  useEffect(() => { setCaseLoading(true); const timer = window.setTimeout(() => setCaseLoading(false), 260); return () => window.clearTimeout(timer); }, [caseId]);

  if (!caseStudy) {
    return <div className="signal-site case-page"><header className="site-header"><a className="brand" href="../../"><img src="/assets/marco-signal-logo.png" alt="" /><span><b>Marco</b><em>Lütkemüller</em></span></a></header><main className="case-missing"><p className="eyebrow"><span className="live-dot" /> 404 / CASE STUDY</p><h1>{labels.unavailable}</h1><p>{labels.unavailableCopy}</p><a className="button button-primary" href="../../">{labels.home} <ArrowLeft size={17} /></a></main></div>;
  }

  return (
    <div className="signal-site case-page" lang={language}>
      <div className={`case-loader ${caseLoading ? "is-visible" : ""}`} aria-live="polite" aria-hidden={!caseLoading}><div><img src="/assets/marco-signal-logo.png" alt="" /><span>{labels.loading}</span><i /></div></div>
      <header className="site-header case-header">
        <a className="brand" href="../../" aria-label="Marco Lütkemüller home"><img src="/assets/marco-signal-logo.png" alt="" /><span><b>Marco</b><em>Lütkemüller</em></span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={labels.menu}><a href="../../#projects" onClick={() => setMenuOpen(false)}>{labels.back}</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a></nav>
        <div className={`language-switch ${language === "en" ? "is-en" : "is-de"}`} role="group" aria-label={copy.languageSwitchLabel}><i className="language-slider" aria-hidden="true" /><button className={language === "de" ? "is-active" : ""} onClick={() => setLanguage("de")} aria-pressed={language === "de"}>DE</button><button className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button></div>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={labels.menu} aria-expanded={menuOpen}><Menu size={22} /></button>
      </header>

      <main>
        <section className="case-hero">
          <a className="case-back" href="../../#projects"><ArrowLeft size={16} /> {labels.back}</a>
          <div className="case-hero-grid"><div><p className="eyebrow"><span className="live-dot" /> {caseStudy.kind}</p><h1>{caseStudy.title}</h1><p className="case-lead">{caseStudy.lead}</p><div className="case-hero-actions"><a className="button button-primary case-return-button" href="../../#projects"><ArrowLeft size={17} /> {labels.back}</a>{hasRepository && <a className="button button-quiet" href={repositoryUrl(caseId)} target="_blank" rel="noreferrer"><Github size={17} /> {labels.repository} <ExternalLink size={15} /></a>}</div></div><aside className="case-identity"><img src="/assets/marco-signal-logo.png" alt="" /><span>CASE / {caseStudy.id.toUpperCase()}</span><i /><b>01</b></aside></div>
        </section>

        <section className="case-dossier">
          <div className="dossier-rail"><span>01</span><i /><b>{caseStudy.kind}</b></div>
          <div className="dossier-content"><section className="dossier-block environment-block"><span className="case-label">{labels.environment}</span><ul className="case-environment">{caseStudy.environment.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="dossier-block"><span className="case-label">{caseStudy.scenarioTitle || labels.scenario}</span><p>{caseStudy.scenario}</p></section><section className="dossier-block"><span className="case-label">{caseStudy.methodTitle || labels.method}</span><p>{caseStudy.method}</p></section><section className="dossier-block highlight-block"><span className="case-label">{caseStudy.findingsTitle || labels.findings}</span><p>{caseStudy.findings}</p></section></div>
        </section>

        <section className="artifact-section"><div className="artifact-head"><p className="eyebrow"><span className="live-dot" /> {labels.artifacts}</p><h2>{labels.artifacts}<br /><i>in Vorbereitung.</i></h2></div><div className="artifact-grid"><article className="artifact-slot screenshot-slot"><div className="artifact-top"><img src="/assets/marco-signal-logo.png" alt="" /><span>01 / {labels.screenshot}</span><i /></div><div className="artifact-screen"><header><span>CAPTURE // LAB VIEW</span><b>PENDING</b></header><span className="artifact-cross" /><span className="artifact-grid-lines" /><footer><span>ARCHITECTURE</span><span>ALERT VIEW</span></footer></div><p>{labels.screenshotHint}</p></article><article className="artifact-slot detection-slot"><div className="artifact-top"><img src="/assets/marco-signal-logo.png" alt="" /><span>02 / {labels.detection}</span><i /></div><div className="artifact-code"><header><span>RULE // Triage</span><b>PLACEHOLDER</b></header><span>rule://{caseStudy.id}</span><i /><i /><i /><i /><footer>log source · severity · investigation step</footer></div><p>{labels.detectionHint}</p></article></div></section>

        <section className="case-evidence"><div><p className="eyebrow"><span className="live-dot" /> {labels.lessons}</p><ul className="case-lessons">{caseStudy.lessons.map((lesson) => <li key={lesson}><Check size={16} />{lesson}</li>)}</ul></div><aside><ShieldCheck size={27} /><span className="case-label">{labels.tools}</span><ul className="tag-list">{caseStudy.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>{hasRepository && <a className="text-link" href={repositoryUrl(caseId)} target="_blank" rel="noreferrer">{labels.repository} <ArrowUpRight size={14} /></a>}</aside></section>
      </main>
      <footer className="case-footer"><span>© 2026 Marco Lütkemüller</span><a href="../../impressum/">Impressum</a><a href="../../datenschutz/">Datenschutzerklärung</a><a href="../../#projects">{labels.back} <ArrowUpRight size={13} /></a></footer>
    </div>
  );
}
