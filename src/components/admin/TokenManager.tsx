import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, AlertTriangle, LogIn, User } from 'lucide-react';
import { externalApiService } from '@/services/externalApi';
import { useToast } from '@/hooks/use-toast';

interface TokenManagerProps {
  onTokenSet?: () => void;
}

export const TokenManager = ({ onTokenSet }: TokenManagerProps) => {
  const [universityId, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const hasAuth = externalApiService.hasAuthToken();
    setHasToken(hasAuth);
    if (hasAuth) {
      setAdminUser(externalApiService.getAdminUser());
    }
  }, []);

  const handleLogin = async () => {
    if (!universityId.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please enter both University ID and Password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await externalApiService.adminLogin({
        university_id: universityId,
        password: password
      });
      
      if (response.success) {
        setHasToken(true);
        setAdminUser(response.data.admin);
        toast({
          title: "Login Successful",
          description: `Welcome ${response.data.admin.name}!`,
        });
        
        onTokenSet?.();
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await externalApiService.adminLogout();
    setHasToken(false);
    setAdminUser(null);
    setUniversityId('');
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  if (hasToken && adminUser) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Logged in as {adminUser.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Connected to BU Sports API</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{adminUser.name}</div>
                <div className="text-xs text-muted-foreground">ID: {adminUser.university_id}</div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="w-5 h-5" />
          Admin Login
        </CardTitle>
        <CardDescription>
          Login to access BU Sports Admin Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your credentials are used to authenticate with the BU Sports API and generate a secure token stored locally.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="universityId">University ID</Label>
            <Input
              id="universityId"
              type="text"
              placeholder="ADMIN001"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={!universityId.trim() || !password.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};