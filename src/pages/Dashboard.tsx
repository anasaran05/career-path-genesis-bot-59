
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Target, Brain, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingModal } from '@/components/OnboardingModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userProfile, showOnboarding } = useAuth();

  // Mock data - replace with real data from your backend
  const recentReports = [
    { id: 1, title: 'Career Path Analysis', date: '2024-03-15', type: 'analysis' },
    { id: 2, title: 'Skills Gap Assessment', date: '2024-03-10', type: 'skills' },
    { id: 3, title: 'Job Market Report', date: '2024-03-05', type: 'market' },
  ];

  const documents = [
    { id: 1, title: 'Software Engineer Resume', type: 'resume' },
    { id: 2, title: 'Cover Letter - Tech Lead', type: 'cover_letter' },
  ];

  const nextSteps = [
    { id: 1, title: 'Complete Skills Assessment', status: 'pending' },
    { id: 2, title: 'Update LinkedIn Profile', status: 'in_progress' },
    { id: 3, title: 'Apply to Recommended Jobs', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Show onboarding modal for first-time users */}
      {showOnboarding && <OnboardingModal isOpen={showOnboarding} />}

      {/* Advisory Reports Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Advisory Reports</h2>
          <Button variant="ghost" onClick={() => navigate('/advisory-report')}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recentReports.map(report => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{new Date(report.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Documents and Pipeline Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Generated Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Generated Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{doc.title}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/documents')}>
                Generate New Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Career Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Your Career Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map(step => (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'in_progress' ? 'bg-blue-500' :
                      'bg-slate-500'
                    }`} />
                    <span>{step.title}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Progress Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Career Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-8 border-navy-600 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Goals Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-3xl font-bold">12</span>
              <span className="text-muted-foreground">/15</span>
            </div>
          </CardContent>
        </Card>

        {/* Credits Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Credits Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-3xl font-bold">
                {userProfile?.used_credits || 0}
              </span>
              <span className="text-muted-foreground">
                /{userProfile?.total_credits || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Skills Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-3xl font-bold">8</span>
              <span className="text-muted-foreground"> new</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
