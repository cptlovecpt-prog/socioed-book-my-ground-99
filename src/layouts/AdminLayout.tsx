import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Footer from "@/components/Footer";
import { LOGO_IMAGE } from "@/constants/images";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_IMAGE} alt="Book My Ground" className="h-8 w-8" />
              <h1 className="font-semibold text-lg">Book My Ground</h1>
            </div>
            <h2 className="font-medium text-muted-foreground">Admin Panel</h2>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
          <Footer isSignedIn={true} />
        </div>
      </div>
    </SidebarProvider>
  );
}