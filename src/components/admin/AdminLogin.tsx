import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Shield, Lock, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (email === "admin@vedictime.com" && password === "admin123") {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Welcome to VedicTime Admin Panel");
        onLoginSuccess();
      }, 1000);
    } else {
      toast.error("Invalid credentials. Use admin@vedictime.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C74225] to-[#942D17] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C74225] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">VedicTime Admin Panel</h1>
          <p className="text-sm text-gray-600">
            Sign in to manage your application
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vedictime.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-900 font-medium mb-1">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-700">
            Email: admin@vedictime.com
          </p>
          <p className="text-xs text-blue-700">
            Password: admin123
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2026 VedicTime. All rights reserved.</p>
          <p className="mt-1">Secured by industry-standard encryption</p>
        </div>
      </Card>
    </div>
  );
}
