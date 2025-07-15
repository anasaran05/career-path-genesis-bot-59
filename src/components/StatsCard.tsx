import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const StatsCard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    profileCompleteness: 0,
    tasksCompletedPercentage: 0,
    totalDocumentsGenerated: 0,
    totalReportsGenerated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { data, error } = await supabase.rpc("get_dashboard_stats");

      if (error) {
        console.error("Error fetching stats:", error);
      } else if (data && data.length > 0) {
        setStats({
          profileCompleteness: data[0].profile_completeness,
          tasksCompletedPercentage: data[0].tasks_completed_percentage,
          totalDocumentsGenerated: data[0].total_documents_generated,
          totalReportsGenerated: data[0].total_reports_generated,
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-muted"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary"
                  strokeDasharray={`${stats.profileCompleteness}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{stats.profileCompleteness}%</span>
              </div>
            </div>
            <p className="mt-2 font-semibold">Profile Completeness</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Tasks Completed</p>
              <Progress value={stats.tasksCompletedPercentage} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{stats.totalDocumentsGenerated}</p>
                <p className="text-sm text-muted-foreground">Docs Generated</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalReportsGenerated}</p>
                <p className="text-sm text-muted-foreground">Reports Read</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 