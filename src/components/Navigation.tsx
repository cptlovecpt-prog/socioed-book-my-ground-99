import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, Menu, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookMyGroundLogo from "@/assets/book-my-ground-logo.png";
import SignInModal from "./SignInModal";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignIn = (data: { name: string; email: string }) => {
    setUserData(data);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserData(null);
  };

  const openSignInModal = () => {
    if (!isSignedIn) {
      setIsSignInModalOpen(true);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={navigateToHome}>
            <img src={bookMyGroundLogo} alt="Book My Ground" className="h-10 w-auto" />
            <span className="text-xl font-bold hover:text-primary transition-colors">Book My Ground</span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* User sign-in/profile */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{userData?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleSignOut}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={openSignInModal}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}

            {/* Hamburger Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/my-bookings")}>
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Help & Support
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </nav>
  );
};

export default Navigation;