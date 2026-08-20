import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * ScrollToTop Component
 * Displays a button to scroll back to the top of the page
 * Shows/hides based on scroll position
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-all shadow-lg hover:shadow-xl hover:shadow-accent/20 animate-in fade-in slide-in-from-bottom-4"
          title="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
}
