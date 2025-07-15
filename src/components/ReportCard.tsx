import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ReportCard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      const { data, error, count } = await supabase
        .from("analysis_results")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reports:", error);
      } else {
        setReports(data);
        setTotalCount(count);
      }
    };

    fetchReports();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advisory Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.slice(0, visibleCount).map((report) => (
            <Link
              key={report.id}
              to={`/advisory-report/${report.id}`}
              className="block hover:bg-muted p-2 rounded-md"
            >
              <h4 className="font-semibold">
                {report.industry_name} Analysis
              </h4>
              <p className="text-sm text-muted-foreground">
                {new Date(report.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
        {totalCount > visibleCount && (
          <Button
            variant="link"
            className="mt-4 px-0"
            onClick={() => setVisibleCount(visibleCount + 3)}
          >
            Load Previous Analyses
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard; 