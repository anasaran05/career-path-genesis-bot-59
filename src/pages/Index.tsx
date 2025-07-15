
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, User, Search, FileText, Sparkles, Brain, Target } from "lucide-react";
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-800">Zane AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-navy-600 transition-colors">Features</a>
              <a href="#process" className="text-slate-600 hover:text-navy-600 transition-colors">How it Works</a>
              <a href="#contact" className="text-slate-600 hover:text-navy-600 transition-colors">Contact</a>
              
              <Button 
                onClick={() => setIsAuthModalOpen(true)} 
                variant="ghost" 
                className="text-navy-700 hover:bg-navy-50 rounded-xl"
              >
                Login
              </Button>
              <Button 
                onClick={handleGetStarted} 
                className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6 leading-tight">
            Your AI Career
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-600 to-autumn-500">
              Guidance Partner
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get personalized career recommendations, skill gap analysis, and tailored job matches powered by advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Journey
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              variant="outline" 
              size="lg" 
              className="rounded-xl px-8 py-4 text-lg font-semibold border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white transition-all duration-300"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive career guidance tailored to your unique profile and goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">Profile Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Get deep insights into your skills, experience, and career potential with our comprehensive profile analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">Smart Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Find the perfect job opportunities that match your skills, preferences, and career goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">Document Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Create professional resumes and cover letters tailored to specific job applications automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Identify missing skills and get personalized recommendations for professional development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Get a step-by-step plan to achieve your career goals with actionable milestones and timelines.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-center">
                  Leverage cutting-edge AI technology for personalized career advice and industry insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            How Zane AI Works
          </h2>
          <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto">
            Get started with your career transformation in just three simple steps.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-4">Complete Your Profile</h3>
              <p className="text-slate-600">
                Share your background, skills, experience, and career aspirations with our intelligent system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-4">Get AI Analysis</h3>
              <p className="text-slate-600">
                Our AI analyzes your profile against thousands of career paths and job requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-4">Take Action</h3>
              <p className="text-slate-600">
                Follow your personalized roadmap, apply to matched jobs, and advance your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with Zane AI.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-autumn-500 to-autumn-600 hover:from-autumn-600 hover:to-autumn-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Zane AI</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Empowering careers through intelligent AI-driven insights and personalized guidance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Zane AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
