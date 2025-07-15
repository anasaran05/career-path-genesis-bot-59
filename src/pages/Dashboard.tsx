
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReportCard from "@/components/ReportCard";
import PipelineCard from "@/components/PipelineCard";
import DocumentCard from "@/components/DocumentCard";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { showOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (error) {
        console.error("Error fetching credits", error);
      } else {
        setCredits(data);
      }
    };
    
    fetchCredits();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-navy-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`flex h-screen bg-background ${showOnboarding ? 'opacity-50' : ''}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header credits={credits} onThemeToggle={handleThemeToggle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/40 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <ReportCard />
            <PipelineCard />
            <DocumentCard />
            <StatsCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
