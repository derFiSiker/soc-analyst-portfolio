import { useParams } from "wouter";
import { ArrowLeft, Calendar, Zap, Code2, AlertCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { projects } from "@/lib/projects";

/**
 * Project Detail Page
 * Displays detailed information about a specific SOC project
 * Design: Modern SOC Dashboard with glassmorphism effects
 */
export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SEO
          title="Project Not Found - DerFisiker"
          description="The project you are looking for does not exist."
        />
        <Navbar />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-3xl font-bold text-accent mb-4">Project Not Found</h1>
          <p className="text-foreground/70 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all">
              <ArrowLeft size={18} />
              Back to Home
            </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO
        title={`${project.title} - DerFisiker SOC Portfolio`}
        description={project.description}
      />
      <Navbar />

      <main className="flex-1 container py-12">
        {/* Back Button */}
        <a href="/#portfolio" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-medium">
            <ArrowLeft size={18} />
            Back to Portfolio
          </a>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-accent mb-2">{project.title}</h1>
              <p className="text-foreground/70 text-lg">{project.category}</p>
            </div>
            <div className="flex items-center gap-2 text-foreground/60 text-sm">
              <Calendar size={16} />
              <span>{project.date}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="status-badge status-active">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Completed
            </span>
          </div>

          {/* Short Description */}
          <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Objective */}
            <section className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">Objective</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {project.objective}
              </p>
            </section>

            {/* Lab Environment */}
            <section className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Lab Environment</h2>
              <div className="space-y-3">
                {project.labEnvironment.map((env, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80">{env}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Attack Scenario */}
            <section className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Attack Scenario</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {project.attackScenario}
              </p>
            </section>

            {/* Detection Method */}
            <section className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">Detection Method</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {project.detectionMethod}
              </p>
            </section>

            {/* Logs & Findings */}
            <section className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Logs & Findings</h2>
              <div className="bg-background/50 rounded border border-border p-4 font-mono text-sm text-accent overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words">
                  {project.logsFindings}
                </pre>
              </div>
            </section>

            {/* Impact Analysis */}
            <section className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Impact Analysis</h2>
              <p className="text-foreground/80 leading-relaxed">
                {project.impactAnalysis}
              </p>
            </section>

            {/* Lessons Learned */}
            <section className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-accent" size={24} />
                <h2 className="text-2xl font-bold">Lessons Learned</h2>
              </div>
              <ul className="space-y-3">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/80">{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools Used */}
            <div className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-accent" size={20} />
                <h3 className="font-bold">Tools Used</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/20 text-accent rounded-full text-sm font-medium border border-primary/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="cyber-card">
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Difficulty</p>
                  <div className="flex gap-1">
                    {[...Array(project.difficulty)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-6 bg-accent rounded-sm"
                      ></div>
                    ))}
                    {[...Array(5 - project.difficulty)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-6 bg-border rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="cyber-card">
              <h3 className="font-bold mb-4">Related Projects</h3>
              <div className="space-y-2">
                {projects
                  .filter((p: any) => p.id !== project.id && p.category === project.category)
                  .slice(0, 3)
                  .map((p: any) => (
                    <a key={p.id} href={`/project/${p.id}`} className="block text-accent hover:text-accent/80 transition-colors text-sm font-medium">
                        → {p.title}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
