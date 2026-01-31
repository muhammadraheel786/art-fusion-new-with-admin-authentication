import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ImagePlus } from "lucide-react";

export const AdminBar = () => {
  const { isAdmin, username, logout } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-card/95 backdrop-blur border rounded-full px-4 py-2 shadow-elevated">
      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
        {username}
      </span>
      <Link to="/admin">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <ImagePlus className="w-4 h-4" />
          Manage Gallery
        </Button>
      </Link>
      <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
};
