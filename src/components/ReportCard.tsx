import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  { id: "1", title: "Q2 2024 Tech Industry Analysis", date: "2024-06-15" },
  { id: "2", title: "Frontend Developer Skills Gap", date: "2024-05-22" },
  { id: "3", title: "AI in Healthcare: Career Opportunities", date: "2024-04-30" },
];

const ReportCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advisory Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <Link
              key={report.id}
              to={`/advisory-report/${report.id}`}
              className="block hover:bg-muted p-2 rounded-md"
            >
              <h4 className="font-semibold">{report.title}</h4>
              <p className="text-sm text-muted-foreground">{report.date}</p>
            </Link>
          ))}
        </div>
        <Button variant="link" className="mt-4 px-0">
          Load Previous Analyses
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportCard; 