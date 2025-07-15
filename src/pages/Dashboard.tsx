
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReportCard from "@/components/ReportCard";
import PipelineCard from "@/components/PipelineCard";
import DocumentCard from "@/components/DocumentCard";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header credits={30} onThemeToggle={handleThemeToggle} onSignOut={handleSignOut} />
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
