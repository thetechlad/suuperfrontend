import { Footer } from "./Footer";
import { FloatingUi } from "./FloatingUi";
import { Header } from "./Header";

export function SiteChrome({ children, showSticky = true }: { children: React.ReactNode; showSticky?: boolean }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingUi showSticky={showSticky} />
    </div>
  );
}
