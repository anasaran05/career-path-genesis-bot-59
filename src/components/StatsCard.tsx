
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface DashboardStats {
  profileCompleteness: number;
  tasksCompletedPercentage: number;
  totalDocumentsGenerated: number;
  totalReportsGenerated: number;
}

interface DashboardStatsResponse {
  profile_completeness: number;
  tasks_completed_percentage: number;
  total_documents_generated: number;
  total_reports_generated: number;
}

const StatsCard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        console.log("Fetching dashboard stats for user:", user.id);
        
        // Cast the RPC call to bypass TypeScript issues
        const { data, error } = await (supabase as any).rpc('get_dashboard_stats');

        console.log("Dashboard stats response:", { data, error });

        if (error) {
          console.error("Error from RPC:", error);
          throw error;
        }
        
        if (data && Array.isArray(data) && data.length > 0) {
          const statsData = data[0] as DashboardStatsResponse;
          setStats({
            profileCompleteness: statsData.profile_completeness || 0,
            tasksCompletedPercentage: statsData.tasks_completed_percentage || 0,
            totalDocumentsGenerated: statsData.total_documents_generated || 0,
            totalReportsGenerated: statsData.total_reports_generated || 0,
          });
        } else {
          console.log("No data returned, setting default stats");
          setStats({
            profileCompleteness: 0,
            tasksCompletedPercentage: 0,
            totalDocumentsGenerated: 0,
            totalReportsGenerated: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats({
          profileCompleteness: 0,
          tasksCompletedPercentage: 0,
          totalDocumentsGenerated: 0,
          totalReportsGenerated: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-2 flex items-center justify-center p-6">
        <Loader2 className="w-8 h-8 animate-spin" />
      </Card>
    );
  }

  const profileCompleteness = stats?.profileCompleteness ?? 0;
  const tasksCompletedPercentage = stats?.tasksCompletedPercentage ?? 0;
  const totalDocumentsGenerated = stats?.totalDocumentsGenerated ?? 0;
  const totalReportsGenerated = stats?.totalReportsGenerated ?? 0;

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
                  strokeDasharray={`${profileCompleteness}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{profileCompleteness}%</span>
              </div>
            </div>
            <p className="mt-2 font-semibold">Profile Completeness</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Tasks Completed</p>
              <Progress value={tasksCompletedPercentage} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{totalDocumentsGenerated}</p>
                <p className="text-sm text-muted-foreground">Docs Generated</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{totalReportsGenerated}</p>
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
