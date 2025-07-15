import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const PipelineCard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPipeline = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("pipeline_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching pipeline:", error);
      } else {
        setTasks(data);
      }
    };

    fetchPipeline();
  }, [user]);

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-primary-foreground" />;
    if (status === 'in_progress') return <ArrowRight className="w-5 h-5 text-primary-foreground" />;
    return <Circle className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusClass = (status) => {
    if (status === 'completed') return "bg-primary";
    if (status === 'in_progress') return "bg-amber-500";
    return "bg-muted";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-6">
            {tasks.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 relative">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${getStatusClass(item.status)}`}
                >
                  {getStatusIcon(item.status)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{new Date(item.due_date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground text-center">Rough Goal → 30 days</p>
      </CardContent>
    </Card>
  );
};

export default PipelineCard; 