/**
 * Creates a static IONOS upload directory from a Vite production build.
 * Run from the source folder after `pnpm build`:
 *   node scripts/build-ionos-static.mjs
 *
 * The source package must contain `deployment-assets/` with the files named below.
 */
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const staticBuild = path.join(root, "dist", "public");
const deploymentAssets = path.join(root, "deployment-assets");
const output = path.join(root, "ionos-static");
const caseStudyIds = ["siem-implementation", "ad-lateral-movement", "network-discovery", "brute-force", "powershell", "ransomware"];
const assetNames = [
  "marco-soc-hero.jpg",
  "project-siem.jpg",
  "marco-signal-logo.png",
  "Marco_Luetkemuller_Portfolio_CV.pdf",
  "Marco_Luetkemuller_ATS_CV.pdf",
];

const manuscriptToStatic = {
  "/manus-storage/marco-soc-hero_1f94ac55.jpg": "marco-soc-hero.jpg",
  "/manus-storage/project-siem_2402fb1c.jpg": "project-siem.jpg",
  "/manus-storage/marco-signal-logo_ff8cb29d.png": "marco-signal-logo.png",
  "/manus-storage/Marco_Luetkemuller_Portfolio_CV_67f40ebf.pdf": "Marco_Luetkemuller_Portfolio_CV.pdf",
  "/manus-storage/Marco_Luetkemuller_ATS_CV_8870e812.pdf": "Marco_Luetkemuller_ATS_CV.pdf",
};

async function visit(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? visit(entryPath) : [entryPath];
  }))).flat();
}

async function rewriteAssetReferences() {
  const files = await visit(output);
  for (const file of files) {
    if (!/\.(html|js|css)$/u.test(file)) continue;
    let text = await readFile(file, "utf8");
    for (const [manusPath, staticName] of Object.entries(manuscriptToStatic)) {
      const replacement = file.endsWith(".css") ? `./${staticName}` : `./assets/${staticName}`;
      text = text.replaceAll(manusPath, replacement);
    }
    if (file.endsWith(".html")) {
      text = text.replace(/<script src="\/__manus__\/debug-collector\.js" defer><\/script>\s*/gu, "");
      text = text.replace(/<script\s+defer\s+src="https:\/\/manus-analytics\.com\/umami"\s+data-website-id="[^"]*"><\/script>\s*/gu, "");
    }
    await writeFile(file, text);
  }
}

await rm(output, { recursive: true, force: true });
await cp(staticBuild, output, { recursive: true });
await rm(path.join(output, "__manus__"), { recursive: true, force: true });
await mkdir(path.join(output, "assets"), { recursive: true });
for (const assetName of assetNames) {
  await cp(path.join(deploymentAssets, assetName), path.join(output, "assets", assetName));
}
await rewriteAssetReferences();
// Every case study receives its own physical index.html. This prevents a local
// file-server or shared host from returning a 404 when a visitor opens a case
// study URL directly. The base tag keeps Vite's relative bundles and dynamic
// asset paths rooted at the static-site directory.
const rootIndex = await readFile(path.join(output, "index.html"), "utf8");
for (const caseStudyId of caseStudyIds) {
  const caseDirectory = path.join(output, "case-studies", caseStudyId);
  await mkdir(caseDirectory, { recursive: true });
  const caseIndex = rootIndex.replace("<head>", "<head>\n    <base href=\"../../\" />");
  await writeFile(path.join(caseDirectory, "index.html"), caseIndex);
}
for (const legalPath of ["impressum", "datenschutz"]) {
  const legalDirectory = path.join(output, legalPath);
  await mkdir(legalDirectory, { recursive: true });
  const legalIndex = rootIndex.replace("<head>", "<head>\n    <base href=\"../\" />");
  await writeFile(path.join(legalDirectory, "index.html"), legalIndex);
}
await writeFile(path.join(output, ".htaccess"), "Options -MultiViews\nDirectoryIndex index.html\n");
console.log(`IONOS-ready static site created at: ${output}`);
