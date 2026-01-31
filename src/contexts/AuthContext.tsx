import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import { hasSupabase } from "@/lib/api";

type AuthContextType = {
  token: string | null;
  username: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  hasSupabase: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    supabase?.auth.signOut();
    setToken(null);
    setUsername(null);
  }, []);

  useEffect(() => {
    if (!hasSupabase || !supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) {
          setToken(session.access_token);
          setUsername(session.user?.email ?? null);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setToken(session?.access_token ?? null);
        setUsername(session?.user?.email ?? null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (data.session) {
      setToken(data.session.access_token);
      setUsername(data.user?.email ?? null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAdmin: !!token && !!username,
        login,
        logout,
        isLoading,
        hasSupabase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
