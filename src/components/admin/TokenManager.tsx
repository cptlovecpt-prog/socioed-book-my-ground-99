import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { externalApiService } from '@/services/externalApi';
import { useToast } from '@/hooks/use-toast';

interface TokenManagerProps {
  onTokenSet?: () => void;
}

export const TokenManager = ({ onTokenSet }: TokenManagerProps) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setHasToken(externalApiService.hasAuthToken());
  }, []);

  const handleSaveToken = async () => {
    if (!token.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid admin token",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Test the token by making a simple API call
      externalApiService.setAuthToken(token);
      await externalApiService.getDashboardStats();
      
      setHasToken(true);
      toast({
        title: "Success",
        description: "Admin token validated and saved successfully",
      });
      
      onTokenSet?.();
    } catch (error) {
      externalApiService.removeAuthToken();
      toast({
        title: "Invalid Token",
        description: "The provided token is invalid or expired. Please check your token.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveToken = () => {
    externalApiService.removeAuthToken();
    setHasToken(false);
    setToken('');
    toast({
      title: "Token Removed",
      description: "Admin token has been removed from local storage",
    });
  };

  if (hasToken) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Token Status
          </CardTitle>
          <CardDescription>
            Admin token is configured and active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Connected to BU Sports API</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleRemoveToken}
            className="w-full"
          >
            Remove Token
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          API Authentication
        </CardTitle>
        <CardDescription>
          Enter your BU Sports Admin API token to access external data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your token will be stored securely in your browser's local storage and never sent to our servers.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="token">Admin Bearer Token</Label>
          <div className="relative">
            <Input
              id="token"
              type={showToken ? "text" : "password"}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handleSaveToken} 
            disabled={!token.trim() || isValidating}
            className="w-full"
          >
            {isValidating ? 'Validating...' : 'Save & Validate Token'}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Token format: Bearer token from your BU Sports API admin panel
          </p>
        </div>
      </CardContent>
    </Card>
  );
};