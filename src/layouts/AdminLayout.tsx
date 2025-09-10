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

  // Redirect if not signed in or not admin
  if (!isSignedIn || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#A855F7]">
        <div className="text-center space-y-8">
          {/* Large Logo Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <img src={LOGO_IMAGE} alt="Book My Ground" className="h-24 w-36 mx-auto" />
            </div>
            <h1 className="text-5xl font-bold text-white tracking-wide">
              BOOK MY<br />GROUND
            </h1>
          </div>
          
          {/* Access Message */}
          <div className="text-white/90 space-y-4">
            <p className="text-xl">
              {!isSignedIn ? "Admin Access Required" : "Insufficient Permissions"}
            </p>
            {!isSignedIn && (
              <Button 
                onClick={() => setIsSignInModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-3"
              >
                Sign In as Administrator
              </Button>
            )}
          </div>
        </div>
        
        <SignInModal
          isOpen={isSignInModalOpen || !isSignedIn}
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignIn}
        />
      </div>
    );
  }

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