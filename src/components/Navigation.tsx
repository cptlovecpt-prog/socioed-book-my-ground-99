import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold">SportBook</span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;