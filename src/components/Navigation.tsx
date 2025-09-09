import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookMyGroundLogo from "@/assets/book-my-ground-logo.png";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
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

            {/* User sign-in toggle */}
            <Button
              variant={isSignedIn ? "default" : "outline"}
              onClick={toggleSignIn}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{isSignedIn ? "Sign Out" : "Sign In"}</span>
            </Button>

            {/* Hamburger Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log-Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;