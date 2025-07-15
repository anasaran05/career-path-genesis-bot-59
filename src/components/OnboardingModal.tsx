
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle } from 'lucide-react';

const OnboardingModal = () => {
  const { showOnboarding, onboardingStep, closeModal, nextStep } = useOnboarding();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (onboardingStep === 'analysis' && user) handleAnalysis();
    if (onboardingStep === 'advisory' && user) handleAdvisory();
  }, [onboardingStep, user]);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-profile', { body: { userId: user.id } });
      if (error) throw error;
      setAnalysisData(data);
    } catch (e) {
      setError('Failed to fetch analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvisory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('advisory-report', { body: { userId: user.id } });
      if (error) throw error;
      setAdvisoryData(data);
    } catch (e) {
      setError('Failed to fetch advisory report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeductCredits = async () => {
    setIsLoading(true);
    try {
      await supabase.functions.invoke('deduct-credits', { body: { userId: user.id } });
      nextStep();
    } catch(e) {
      setError('Failed to deduct credits.');
    } finally {
      setIsLoading(false);
    }
  }

  const renderContent = () => {
    if (isLoading) return <div className="flex justify-center items-center h-40"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    if (error) return <div className="text-destructive">{error}</div>;

    switch (onboardingStep) {
      case 'profile':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Profile</DialogTitle>
              <DialogDescription>
                Let's get your profile set up to provide the best career recommendations.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => navigate('/intake')}>Go to Intake Form</Button>
            </DialogFooter>
          </>
        );
      case 'analysis':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Career Path Analysis</DialogTitle>
            </DialogHeader>
            {analysisData && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Current Eligible Roles</h4>
                  <ul className="list-disc list-inside">{analysisData.current.map(role => <li key={role}>{role}</li>)}</ul>
                </div>
                <div>
                  <h4 className="font-semibold">Post-Graduation Roles</h4>
                  <ul className="list-disc list-inside">{analysisData.postGrad.map(role => <li key={role}>{role}</li>)}</ul>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleDeductCredits}>Finalize Analysis (-10 Credits)</Button>
            </DialogFooter>
          </>
        );
      case 'advisory':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Advisory Report</DialogTitle>
            </DialogHeader>
            {advisoryData && (
              <div>
                <h4 className="font-semibold">Skill Gaps</h4>
                <ul className="list-disc list-inside">{advisoryData.skillGaps.map(skill => <li key={skill}>{skill}</li>)}</ul>
                <h4 className="font-semibold mt-4">Upskilling Roadmap</h4>
                <ul className="list-decimal list-inside">{advisoryData.roadmap.map(task => <li key={task}>{task}</li>)}</ul>
              </div>
            )}
            <DialogFooter>
              <Button onClick={nextStep}>Continue to Job Scan</Button>
            </DialogFooter>
          </>
        );
      case 'jobScan':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Ready for Job Scan?</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-amber-500" />
              <p>Before you proceed, ensure your profile is updated with certifications and projects for the best results.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>I'll do it later</Button>
              <Button onClick={() => navigate('/job-scan')}>Proceed to Job Scan</Button>
            </DialogFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={showOnboarding} onOpenChange={closeModal}>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
