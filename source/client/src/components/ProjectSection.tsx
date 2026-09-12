/**
 * Signal Trace project overview: platform context plus concise entry points to
 * dedicated case-study documents and their associated GitHub repositories.
 */
import { ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import { portfolioContent } from "@/content/portfolioContent";
import { caseRepositorySlugs, repositoryUrl } from "@/config/siteConfig";

type Projects = typeof portfolioContent.de.projects | typeof portfolioContent.en.projects;

function isRepositoryCase(id: string): id is keyof typeof caseRepositorySlugs {
  return id in caseRepositorySlugs;
}

export default function ProjectSection({ projects, platformImage }: { projects: Projects; platformImage: string }) {
  return (
    <section id="projects" className="content-section projects-section">
      <div className="section-heading"><div className="section-marker"><span>01</span><img className="section-node" src="/assets/marco-signal-logo.png" alt="" /><i /><strong>{projects.marker}</strong></div><div><h2>{projects.heading[0]}<br /><i>{projects.heading[1]}</i></h2><p>{projects.intro}</p></div></div>
      <div className="project-group-label"><span>{projects.platformLabel}</span><i /></div>
      <article className="project-card platform-card"><div className="project-media"><img src={platformImage} alt="" /><div className="image-scrim" /><span className="project-number">00</span><span className="project-state"><i />{projects.platform.state}</span></div><div className="project-body"><div className="project-title-line"><h3>{projects.platform.title}</h3><ArrowUpRight size={22} /></div><p>{projects.platform.summary}</p><ul className="tag-list">{projects.platform.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="project-links"><a href="./case-studies/siem-implementation/">{projects.walkthrough} <ChevronRight size={15} /></a><a href="https://github.com/derFiSiker" target="_blank" rel="noreferrer">{projects.repository} <ExternalLink size={14} /></a></div></div></article>
      <div className="project-group-label case-group-label"><span>{projects.casesLabel}</span><i /></div>
      <div className="case-card-grid">{projects.cases.map((project, index) => <article className="case-card" key={project.id}><div className="case-card-top"><span>0{index + 1}</span><i /><b>{project.state}</b></div><div><span className="case-date">{project.date}</span><h3>{project.title}</h3><p>{project.summary}</p></div><ul className="tag-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="case-actions"><a className="case-card-link" href={`./case-studies/${project.id}/`}>{projects.walkthrough} <ArrowUpRight size={16} /></a>{isRepositoryCase(project.id) && <a className="case-repository-link" href={repositoryUrl(project.id)} target="_blank" rel="noreferrer">{projects.repository} <ExternalLink size={13} /></a>}</div></article>)}</div>
    </section>
  );
}
