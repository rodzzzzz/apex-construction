import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BriefDrawer } from "@/components/brief-drawer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import type { SiteSetting } from "@/payload-types";

export function SiteChrome({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSetting;
}) {
  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen w-full bg-background">
        <Navbar />
        {children}
        <Footer settings={settings} />
      </div>
      <BriefDrawer />
      <Toaster />
    </>
  );
}
