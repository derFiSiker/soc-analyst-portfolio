import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CaseStudyPage from "./pages/CaseStudyPage";
import LegalPage from "./pages/LegalPage";

/** Signal Trace: global dark theme required for the carbon, slate, and acid-green SOC portfolio experience. */


function Router() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const caseMatch = path.match(/\/case-studies\/([^/]+)(?:\/index\.html)?$/);

  if (caseMatch) return <CaseStudyPage caseId={caseMatch[1]} />;
  // A static export opened as /static-site/index.html must render the portfolio,
  // rather than being interpreted as an unknown SPA route.
  if (path === "/impressum") {
    return <LegalPage type="impressum" />;
  }

  if (path === "/datenschutz") {
    return <LegalPage type="datenschutz" />;
  }
  return <Home />;
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
