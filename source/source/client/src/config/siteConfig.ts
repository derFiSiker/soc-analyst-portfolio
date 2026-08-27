/**
 * SITE CONFIGURATION
 * ------------------
 * Edit this file in Visual Studio Code when the GitHub repository names or
 * Formspree endpoint change. Formspree remains disabled until a real endpoint
 * replaces the placeholder below.
 */

export const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

export const caseRepositorySlugs = {
  "ad-lateral-movement": "ad-lateral-movement-detection",
  "network-discovery": "network-discovery-monitoring",
  "brute-force": "brute-force-attack-detection",
  powershell: "suspicious-powershell-activity",
  ransomware: "ransomware-behavior-detection",
} as const;

export function repositoryUrl(slug: keyof typeof caseRepositorySlugs) {
  return `https://github.com/derFiSiker/${caseRepositorySlugs[slug]}`;
}

export function hasFormspreeEndpoint() {
  return !formspreeEndpoint.includes("YOUR_FORM_ID");
}
