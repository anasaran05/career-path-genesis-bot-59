
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Brain } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const handleStartOnboarding = () => {
    completeOnboarding();
    navigate('/intake');
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-navy-800">Complete Your Profile</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <p className="text-slate-600">
            Welcome to Zane AI! Let's start by understanding your career goals and experience.
            This will help us provide personalized recommendations and insights.
          </p>

          <div className="grid gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-navy-800 mb-2">Why Complete Your Profile?</h3>
              <ul className="text-left text-sm text-slate-600 space-y-2">
                <li>• Get personalized career recommendations</li>
                <li>• Receive tailored job matches</li>
                <li>• Identify skill gaps and growth opportunities</li>
                <li>• Generate optimized resumes and cover letters</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={handleStartOnboarding}
            className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white"
          >
            Start Profile Setup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
