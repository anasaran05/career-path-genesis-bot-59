
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Download, Send, CheckCircle, FileText, Sparkles, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PremiumModal from "@/components/PremiumModal";
import ManualApplicationModal from "@/components/ManualApplicationModal";

const JobApplication = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Analyzing job requirements...");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetterUrl, setCoverLetterUrl] = useState("");
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const generationSteps = [
    "Analyzing job requirements...",
    "Matching your profile...",
    "Generating tailored resume...",
    "Writing personalized cover letter...",
    "Optimizing for ATS systems..."
  ];

  const handleGenerateDocuments = async () => {
    if (!user || !jobId) return;

    setIsGenerating(true);
    setProgress(0);
    setCurrentStep(generationSteps[0]);

    let step = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (newProgress >= (step + 1) * 20 && step < generationSteps.length - 1) {
          step++;
          setCurrentStep(generationSteps[step]);
        }
        return newProgress;
      });
    }, 300);

    try {
      const res = await fetch("/api/generateDocuments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, jobId }),
      });

      if (res.status === 402) {
        setShowPremiumModal(true);
        throw new Error("Not enough credits");
      }

      if (!res.ok) throw new Error("Failed to generate documents");

      const data = await res.json();
      setResumeUrl(data.resumeUrl);
      setCoverLetterUrl(data.coverLetterUrl);
      setRemainingCredits(data.remainingCredits);
      setGenerationComplete(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!generationComplete ? (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-navy-800">Generate Your Resume & Cover Letter</h1>
            {isGenerating ? (
              <>
                <p className="text-lg text-slate-600">{currentStep}</p>
                <Progress value={progress} className="h-2" />
              </>
            ) : (
              <Button size="lg" onClick={handleGenerateDocuments}>
                Generate Application Documents
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-8 text-center">
            <div className="flex items-center justify-center text-green-600 font-medium text-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              Documents Generated Successfully
            </div>

            <h2 className="text-3xl font-bold text-navy-800">Your Application is Ready!</h2>
            <p className="text-slate-600 text-lg">
              Customized resume and cover letter for this role are ready to download.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button onClick={() => handleDownload(resumeUrl)} disabled={!resumeUrl}>
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
              <Button onClick={() => handleDownload(coverLetterUrl)} disabled={!coverLetterUrl}>
                <Download className="w-5 h-5 mr-2" />
                Download Cover Letter
              </Button>
            </div>

            {remainingCredits !== null && (
              <p className="text-sm text-slate-500">
                Credits remaining: <strong>{remainingCredits}</strong>
              </p>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => setShowManualModal(true)} variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Apply Manually
              </Button>
              <Button onClick={() => setShowPremiumModal(true)} className="bg-yellow-500 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Auto-Apply (Premium)
              </Button>
            </div>
          </div>
        )}
      </div>

      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <ManualApplicationModal open={showManualModal} onClose={() => setShowManualModal(false)} />
    </div>
  );
};

export default JobApplication;
