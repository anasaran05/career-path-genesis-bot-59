
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, User, Search, FileText, Sparkles, Brain, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/intake');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">by ZaneProEd</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="text-slate-600 hover:text-navy-600 transition-colors">Features</a>
            <a href="#process" className="text-slate-600 hover:text-navy-600 transition-colors">How it Works</a>
            <a href="#contact" className="text-slate-600 hover:text-navy-600 transition-colors">Contact</a>
            
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-autumn-100 text-autumn-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-navy-800 mb-6 leading-tight animate-fade-in">
              Meet
              <span className="bg-gradient-to-r from-navy-600 to-autumn-500 bg-clip-text text-transparent"> Zane AI</span>
            </h1>
            
            <p className="text-xl text-navy-600 font-medium mb-4 animate-fade-in">Smart Career Mapping for Healthcare Professionals</p>
            
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Your intelligent career co-pilot that analyzes your healthcare background, maps perfect career paths, and guides you to success in clinical roles and allied health opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
              <Button onClick={handleGetStarted} size="lg" className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Your Career Journey
                <Target className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-slate-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section id="process" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-800 mb-4">Complete Career Intelligence in 7 Steps</h2>
            <p className="text-xl text-slate-600">Comprehensive healthcare career transformation</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: User,
                title: "Background Collection",
                desc: "Complete intake of education, skills, and healthcare goals",
                step: "01",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Search,
                title: "Interest Analysis",
                desc: "AI analyzes your profile for perfect healthcare career matches",
                step: "02",
                color: "from-navy-500 to-navy-600"
              },
              {
                icon: Search,
                title: "Job Market Scan",
                desc: "Real-time scanning of healthcare and clinical opportunities",
                step: "03",
                color: "from-autumn-500 to-autumn-600"
              },
              {
                icon: FileText,
                title: "Path Building",
                desc: "Creates personalized career roadmap with action steps",
                step: "04",
                color: "from-green-500 to-green-600"
              },
              {
                icon: FileText,
                title: "CV Generation",
                desc: "Tailored resume and cover letter for each healthcare application",
                step: "05",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Search,
                title: "Auto Application",
                desc: "Applies to relevant healthcare jobs automatically",
                step: "06",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: FileText,
                title: "Advisory Report",
                desc: "Detailed recommendations for healthcare career improvement",
                step: "07",
                color: "from-teal-500 to-teal-600"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white border border-slate-200 hover:border-navy-300 transition-all duration-300 group hover:shadow-lg rounded-xl">
                <CardHeader className="text-center pb-3">
                  <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-autumn-600 mb-2 tracking-wider">STEP {item.step}</div>
                  <CardTitle className="text-navy-800 text-lg font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-slate-600 text-center text-sm leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-800 mb-4">Why Choose Zane AI</h2>
            <p className="text-xl text-slate-600">Everything you need for healthcare career success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Smart Profile Analysis",
                desc: "AI analyzes your healthcare background to identify optimal career paths in clinical and allied health fields",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Real-time Job Scanning",
                desc: "Continuously monitors healthcare job boards for fresh opportunities in hospitals, clinics, and healthcare organizations",
                gradient: "from-navy-500 to-blue-500"
              },
              {
                title: "Custom Resume Generation",
                desc: "Creates unique, ATS-optimized resumes tailored for healthcare and clinical roles",
                gradient: "from-autumn-500 to-red-500"
              },
              {
                title: "Automated Applications",
                desc: "Applies to relevant healthcare positions across multiple platforms automatically",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Healthcare Skills Gap Analysis",
                desc: "Identifies missing skills and recommends learning paths for healthcare careers",
                gradient: "from-purple-500 to-indigo-500"
              },
              {
                title: "Career Progress Tracking",
                desc: "Monitor application status, interview feedback, and healthcare career advancement",
                gradient: "from-teal-500 to-green-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white border border-slate-200 hover:border-navy-300 transition-all duration-300 group hover:shadow-lg rounded-xl">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <CardTitle className="text-navy-800 text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-600 to-autumn-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Healthcare Career?</h2>
            <p className="text-xl text-white/90 mb-8">Join thousands of healthcare graduates who've accelerated their career success with Zane AI</p>
            <Button onClick={handleGetStarted} size="lg" className="bg-white text-navy-700 hover:bg-slate-100 px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Begin Your Journey with Zane AI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-navy-700 font-bold text-lg">Zane AI</span>
                <p className="text-slate-500 text-sm">by ZaneProEd</p>
              </div>
            </div>
            <div className="text-slate-500 text-sm">© 2024 ZaneProEd. Transforming healthcare careers with intelligence.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
