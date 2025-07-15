import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const pipelineSteps = [
  { step: 1, title: "Profile Completion", completed: true },
  { step: 2, title: "Initial Job Scan", completed: true },
  { step: 3, title: "First Application", completed: false },
  { step: 4, title: "Interview Prep", completed: false },
];

const PipelineCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-6">
            {pipelineSteps.map((item) => (
              <div key={item.step} className="flex items-center space-x-4 relative">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    item.completed ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {item.completed && <CheckCircle className="w-5 h-5 text-primary-foreground" />}
                </div>
                <p className={`${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.title}
                </p>
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