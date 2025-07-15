import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Sun, Moon, User, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreditUsageModal from "./CreditUsageModal";
import { useAuth } from "@/contexts/AuthContext";

const Header = ({ credits, onThemeToggle }) => {
  const { signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isCreditModalOpen, setCreditModalOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">ZANE AI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-sm font-semibold" onClick={() => setCreditModalOpen(true)}>
                {credits ? `${credits.total_credits - credits.used_credits} Credits` : "..."}
              </Button>
              <Button variant="ghost" size="icon" onClick={onThemeToggle}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => navigate('/account')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Account Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setCreditModalOpen(true)}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Recharge Credits</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => navigate('/help')}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <CreditUsageModal isOpen={isCreditModalOpen} onClose={() => setCreditModalOpen(false)} credits={credits} />
    </>
  );
};

export default Header; 