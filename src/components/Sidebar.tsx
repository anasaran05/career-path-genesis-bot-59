import { Link, useLocation } from "react-router-dom";
import { Home, ScanSearch, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/job-scan", icon: ScanSearch, label: "Job Scan" },
  { href: "/advisory-report", icon: FileText, label: "Advisory Report Analysis" },
];

const Sidebar = ({ onProfileClick }) => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background p-4">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onProfileClick}
          className={cn(
            "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium w-full text-left",
            location.pathname === "/profile"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;