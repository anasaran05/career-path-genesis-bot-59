import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DocumentCard = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("generated_documents")
        .select("id, type, created_at, resume_url, cover_letter_url")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) {
        console.error("Error fetching documents:", error);
      } else {
        setDocuments(data);
      }
    };

    fetchDocuments();
  }, [user]);

  const getDocumentName = (doc) => {
    if (doc.type === 'resume' && doc.resume_url) {
      return doc.resume_url.split('/').pop();
    }
    if (doc.type === 'cover_letter' && doc.cover_letter_url) {
      return doc.cover_letter_url.split('/').pop();
    }
    return 'Document';
  }

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
                  <p className="font-semibold">{getDocumentName(doc)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" size="icon">
                <a href={doc.resume_url || doc.cover_letter_url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard; 