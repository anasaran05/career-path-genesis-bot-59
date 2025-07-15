import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const documents = [
  { id: "1", type: "Resume", name: "Tech_Resume_v3.pdf" },
  { id: "2", type: "Cover Letter", name: "Cover_Letter_Google.pdf" },
];

const DocumentCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.type}</p>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard; 