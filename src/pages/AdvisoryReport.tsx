import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, TrendingUp, Target, Award, Book, Globe, Lightbulb, Download, BarChart3, Brain, Rocket } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConsultationModal from "@/components/ConsultationModal";

const AdvisoryReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData || {};
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Analyzing your profile...');
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const analysisPhases = [
    'Analyzing your profile...',
    'Evaluating market trends...',
    'Matching skills to opportunities...',
    'Generating personalized insights...',
    'Preparing recommendations...'
  ];

  useEffect(() => {
    let phase = 0;
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 4;
        if (newProgress >= 100) {
          setIsAnalyzing(false);
          clearInterval(interval);
          return 100;
        }
        if (newProgress > (phase + 1) * 20) {
          phase++;
          if (phase < analysisPhases.length) {
            setCurrentPhase(analysisPhases[phase]);
          }
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const insights = [
    {
      icon: BarChart3,
      title: "Career Fit Analysis",
      score: 92,
      description: "Your healthcare background aligns excellently with clinical and regulatory roles",
      actionItems: [
        "Focus on GCP certification for clinical research",
        "Build regulatory knowledge through courses"
      ],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Brain,
      title: "Skill Development Priority",
      score: 78,
      description: "Strong foundation with key areas for enhancement identified",
      actionItems: [
        "Complete pharmacovigilance certification",
        "Learn healthcare data analytics tools"
      ],
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: Rocket,
      title: "Growth Opportunities",
      score: 85,
      description: "Multiple high-growth career paths available in your field",
      actionItems: [
        "Network with industry professionals",
        "Consider international licensing (NAPLEX/PEBC)"
      ],
      color: "from-green-500 to-green-700"
    }
  ];

  const recommendations = [
    {
      category: "📚 Immediate Learning Priorities",
      priority: "High",
      timeline: "2-3 months",
      items: [
        {
          title: "Good Clinical Practice (GCP) Certification",
          description: "Essential for clinical research roles",
          action: "Enroll in ICH-GCP course through NIDA/ACRP"
        },
        {
          title: "Pharmacovigilance Training",
          description: "Drug safety expertise in high demand",
          action: "Complete PV certification from recognized institute"
        }
      ]
    },
    {
      category: "🎯 Career Path Strategy",
      priority: "Medium",
      timeline: "6-12 months",
      items: [
        {
          title: "Start with Clinical Roles",
          description: "Build strong foundation in hospital pharmacy",
          action: "Apply to hospitals with structured healthcare programs"
        },
        {
          title: "Industry Transition Plan",
          description: "Move to healthcare industry after clinical experience",
          action: "Network with industry professionals"
        }
      ]
    }
  ];

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 max-w-lg w-full mx-4 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-20 h-20 border-4 border-navy-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-navy-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-navy-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Zane AI is reviewing your profile...</h2>
              <p className="text-navy-600">Generating personalized career insights just for you</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-700">{currentPhase}</span>
                <span className="text-navy-500">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-navy-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/analysis" className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Analysis</span>
            </Link>
            <div className="text-center">
              <p className="text-sm text-navy-500">Your Smart Career Assistant — Powered by ZaneProEd</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-navy-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-navy-800 font-bold text-xl">Zane AI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4 mr-2" />
              Professional Career Advisory Report
            </div>
            
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              Your Personalized Career Insights
            </h1>
            <p className="text-xl text-navy-600 mb-8 max-w-2xl mx-auto">
              Comprehensive analysis and recommendations to accelerate your healthcare career journey
            </p>

            <Button className="bg-gradient-to-r from-autumn-500 to-autumn-600 hover:from-autumn-600 hover:to-autumn-700 text-white shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Download Full Report (PDF)
            </Button>
          </div>

          {/* Key Insights Dashboard */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center mb-4`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{insight.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="text-3xl font-bold text-navy-800 mr-3">{insight.score}%</div>
                    <Progress value={insight.score} className="flex-1 h-2" />
                  </div>
                  <p className="text-navy-600 mb-4">{insight.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-navy-700">What you should do next:</p>
                    {insight.actionItems.map((action, idx) => (
                      <div key={idx} className="flex items-start text-sm text-navy-600">
                        <div className="w-1.5 h-1.5 bg-autumn-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {action}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Recommendations */}
          <div className="space-y-8">
            {recommendations.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-white shadow-xl border-0 animate-fade-in" style={{
                animationDelay: `${sectionIndex * 0.2}s`
              }}>
                <CardHeader>
                  <CardTitle className="text-navy-900 flex items-center text-2xl">
                    {section.category}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${section.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {section.priority} Priority
                    </Badge>
                    <Badge variant="outline" className="border-navy-300 text-navy-600">
                      {section.timeline}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border border-navy-100 rounded-xl p-6 hover:bg-navy-50 transition-colors">
                        <h4 className="text-lg font-semibold text-navy-900 mb-2">{item.title}</h4>
                        <p className="text-navy-600 mb-3">{item.description}</p>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <Lightbulb className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-blue-700 font-medium text-sm">Next Action: </span>
                              <span className="text-navy-700 text-sm">{item.action}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps CTA */}
          <Card className="bg-gradient-to-r from-navy-600 to-navy-800 border-0 shadow-2xl mt-12 animate-fade-in">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Career?</h2>
              <p className="text-navy-100 mb-6 text-lg max-w-2xl mx-auto">
                Schedule a 1-on-1 consultation with our career advisors to create your personalized action plan
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-autumn-500 hover:bg-autumn-600 text-white px-8 shadow-lg"
                  onClick={() => setShowConsultationModal(true)}
                >
                  Schedule Free Consultation
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:text-navy-800 px-8 bg-autumn-500 hover:bg-autumn-400"
                  onClick={() => navigate('/courses')}
                >
                  Explore Learning Paths
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 py-8 border-t border-navy-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-navy-600 to-navy-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">Z</span>
              </div>
              <span className="text-navy-600 font-semibold">ZaneProEd</span>
            </div>
            <p className="text-navy-500 text-sm">Smart Career Mapping for Healthcare Graduates</p>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={showConsultationModal} 
        onClose={() => setShowConsultationModal(false)} 
      />
    </div>
  );
};

export default AdvisoryReport;
