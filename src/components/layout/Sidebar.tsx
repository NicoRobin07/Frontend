import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  Send,
  Mail,
  BarChart3,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import staffinixLogo from "@/assets/staffinix-logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Consultants", path: "/consultants" },
  { icon: Briefcase, label: "Job Requirements", path: "/jobs" },
  { icon: Building2, label: "Vendors", path: "/vendors" },
  { icon: Send, label: "Submissions", path: "/submissions" },
  { icon: Mail, label: "Email Automation", path: "/emails" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Bot, label: "AI Assistant", path: "/assistant" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = { email: "demo@staffinix.com" };
  const signOut = async () => {};


  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const userEmail = user?.email || "user@example.com";
  const userInitials = userEmail
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 px-4 flex items-center border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={staffinixLogo}
            alt="Staffinix"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <span className="font-bold text-lg text-foreground">
            Staffinix
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
            location.pathname === "/settings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {userInitials}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userEmail.split("@")[0]}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
