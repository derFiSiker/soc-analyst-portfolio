# Design Exploration: Marco Lütkemüller SOC Portfolio

## Three stylistic approaches

### 1. Signal Trace
**Very Brief Intro:** A restrained security-operations journal built around faint scan lines, terminal-like metadata, and one acid-green signal color. It feels precise, technical, and calm rather than theatrically "hacker".

**Probability:** 0.07

### 2. Field Manual
**Very Brief Intro:** An editorial systems notebook using light paper textures, diagram annotations, and warm graphite typography. It makes complex lab work feel deliberate and well documented.

**Probability:** 0.02

### 3. Monolith Console
**Very Brief Intro:** A heavy black control surface with luminous green data points and architectural panels. The impression is high-control and infrastructural, with bolder technical drama.

**Probability:** 0.09

---

# Chosen Direction: Signal Trace

## Design Movement

**Swiss International Typographic Style reinterpreted as a modern SOC analyst notebook.** The interface prioritizes information hierarchy, evidence, and restrained technical character: clean typography, stable spacing, evidence-like labels, and sparse green signal accents.

## Core Principles

1. **Evidence before decoration:** Projects, technologies, progress states, and links are presented as verifiable technical artifacts rather than generic portfolio cards.
2. **Quiet contrast:** A nearly-black ground and layered slate panels create depth; acid green is reserved for status, actions, and active signals.
3. **Structured asymmetry:** A thin left index rail and offset content blocks keep the page editorial and navigable without a standard centered landing-page feel.
4. **Legible density:** Mono labels convey technical depth while generous whitespace and a humanist sans-serif keep reading comfortable.

## Color Philosophy

The experience is anchored in **carbon black** and **slate grey** to evoke a focused operations desk. The signature acid green works as a scarce, semantic signal: successful status, current reading position, primary action, or observed activity. White is softened to a cool near-white so the page retains calm night-time contrast rather than harsh glare.

## Layout Paradigm

The page follows an **operations log** structure rather than a centered sales-page grid. A vertical index column stays visible on desktop, while sections flow as offset modules along a central trace line. The hero uses a broad left-aligned statement paired with a visual telemetry pane, and later sections alternate their visual weight between the content field and a narrow metadata rail.

## Signature Elements

1. A vertical **signal trace** line with illuminated nodes, used between major sections and in project metadata.
2. Small uppercase **evidence labels** such as `STATUS / LIVE`, `ROLE / BUILDER`, and `TRACK / SOC`.
3. Very subtle **scan-line grain** inside large dark surfaces, never competing with text.

## Interaction Philosophy

Interactions should resemble an analyst moving through a well-organized system: clear feedback, no spectacle. Navigation links show a directional green rule; project tiles reveal their action links and a subtle status pulse on hover. The mobile index becomes a compact scrollable command bar.

## Animation

On page load, the hero metadata and signal nodes enter with short, staggered opacity-and-translate motion (40–70 ms stagger; 220 ms maximum). The trace node can emit a low-key green glow once on entering the viewport. Hover states shift only transform, border tone, and opacity within 160–220 ms using `cubic-bezier(0.23, 1, 0.32, 1)`. All nonessential motion is disabled for `prefers-reduced-motion`.

## Typography System

**Space Grotesk** provides the portfolio’s headings and body copy: rational, engineered, and human enough for technical writing. **IBM Plex Mono** is reserved for navigation labels, chips, tags, status blocks, code-like data, and project IDs. Headings are large, tight, and left-aligned; body text maintains a relaxed reading width; mono labels remain small but high-contrast.

## Brand Essence

**Marco Lütkemüller turns self-built SOC environments into visible, repeatable security operations practice for technical teams.**

Personality: **methodical, alert, unpretentious.**

## Brand Voice

Headlines are direct and evidence-led. CTAs use operational verbs rather than marketing promises. Microcopy describes what can be inspected or opened.

Example lines:

> Build, detect, document, repeat.

> Inspect the lab notes, then open the evidence.

## Wordmark & Logo

The mark is a **split signal node**: a compact angular circle interrupted by a diagonal trace, suggesting a protected system boundary and a moving data point. It appears in acid green on a transparent background; the wordmark is set separately in Space Grotesk, not baked into the mark.

## Signature Brand Color

**Signal Green — #B8F927.**

## Style Decisions

- Signal Green `#B8F927` is a semantic signal only: active states, status, primary actions, key numerals, and selected headline emphasis. It is never used as a full-section background.
- The vertical signal trace continues through every major page section, connecting evidence labels, numbers, and metadata into one operational log.
- The split signal node recurs inside section labels and the hero telemetry module, making it a system symbol rather than a header-only logo.
