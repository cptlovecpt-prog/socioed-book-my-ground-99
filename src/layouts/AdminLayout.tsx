import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Footer from "@/components/Footer";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-semibold">Admin Panel</h1>
            </header>
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
        <Footer isSignedIn={true} />
      </div>
    </SidebarProvider>
  );
}