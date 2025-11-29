import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-purple-500/5 -z-10" />
      <Navigation />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <main className="flex-1 pt-16 lg:pt-0">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-700">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
