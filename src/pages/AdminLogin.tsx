import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Palette } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, hasSupabase } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabase) {
      toast({
        variant: "destructive",
        title: "Not configured",
        description: "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to deploy.",
      });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Welcome back!", description: "You are now logged in." });
      navigate("/admin", { replace: true });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err instanceof Error ? err.message : "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <Palette className="w-8 h-8" />
          <span className="font-display text-xl font-semibold">ArtFusion</span>
        </Link>

        <div className="bg-card rounded-2xl shadow-artistic p-8 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-6 h-6 text-primary" />
            <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          </div>

          {!hasSupabase ? (
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Supabase is not configured. To enable admin:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Create a project at supabase.com</li>
                <li>Run the SQL in supabase/schema.sql</li>
                <li>Create a storage bucket named &quot;paintings&quot;</li>
                <li>Create an admin user in Authentication</li>
                <li>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env</li>
              </ol>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="mt-2"
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
