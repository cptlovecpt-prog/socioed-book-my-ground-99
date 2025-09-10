import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Footer from "@/components/Footer";
import { LOGO_IMAGE } from "@/constants/images";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import SignInModal from "@/components/SignInModal";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { theme, setTheme } = useTheme();
  const { user, isSignedIn, signOut } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = () => {
    signOut();
  };

  const openSignInModal = () => {
    if (!isSignedIn) {
      setIsSignInModalOpen(true);
    }
  };

  const handleSignIn = (data: { name: string; email: string; isAdmin: boolean }) => {
    // Sign in logic handled by the modal and AuthContext
    setIsSignInModalOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              {/* User sign-in toggle */}
              {isSignedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user?.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={handleSignOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" onClick={openSignInModal} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}

              {/* Theme toggle */}
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Logo and title moved to left */}
              <div className="flex items-center gap-2 ml-2">
                <h1 className="font-semibold text-lg">Book My Ground</h1>
                <img src={LOGO_IMAGE} alt="Book My Ground" className="h-8 w-12" />
              </div>
            </div>
            
            <h2 className="font-medium text-muted-foreground">Admin Panel</h2>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
          <Footer isSignedIn={true} />
        </div>
      </div>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </SidebarProvider>
  );
}