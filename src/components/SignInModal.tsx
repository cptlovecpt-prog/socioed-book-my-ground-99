import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (userData: { name: string; email: string; isAdmin: boolean }) => void;
}

const SignInModal = ({ isOpen, onClose, onSignIn }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      const success = signIn(email, password);
      
      if (success) {
        toast({
          title: email === 'admin@bu.edu' ? "Welcome Admin" : "Welcome to Book My Ground",
          description: email === 'admin@bu.edu' ? "Create booking or Manage Book Your Ground Portal from here" : "You have successfully signed in.",
        });
        
        onClose();
        setEmail("");
        setPassword("");
        setRememberMe(false);
      } else {
        toast({
          title: "Sign In Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Sign In</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSignIn} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember-me" className="text-sm">
              Remember me
            </Label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;