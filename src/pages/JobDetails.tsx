
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Building, Target, Brain, Sparkles, Send } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Mock job data - in real app this would come from API
  const job = {
    id: jobId,
    title: "Clinical Research Associate",
    company: "HealthTech Solutions",
    location: "Remote / New York, NY",
    type: "Full-time",
    experience: "2-4 years",
    salary: "$65,000 - $85,000",
    match: 92,
    posted: "2 days ago",
    applicants: "47 applicants",
    description: `Join our dynamic team as a Clinical Research Associate where you'll lead clinical trials and ensure regulatory compliance in groundbreaking healthcare research.

We're looking for a dedicated healthcare professional to join our clinical research team. You'll be responsible for monitoring clinical trials, ensuring protocol compliance, and maintaining relationships with clinical sites.`,
    
    responsibilities: [
      "Monitor clinical trial conduct at investigational sites",
      "Ensure protocol compliance and data quality",
      "Coordinate with principal investigators and site staff",
      "Review and verify clinical data for accuracy",
      "Conduct site initiation and close-out visits",
      "Prepare clinical monitoring reports",
      "Ensure adherence to GCP guidelines and regulatory requirements"
    ],
    
    requirements: [
      "Bachelor's degree in Life Sciences, Nursing, or related field",
      "2+ years of clinical research experience preferred",
      "Knowledge of GCP guidelines and regulatory requirements",
      "Strong attention to detail and organizational skills",
      "Excellent communication and interpersonal skills",
      "Ability to travel to clinical sites (up to 50%)",
      "Proficiency in clinical data management systems"
    ],
    
    benefits: [
      "Competitive salary and performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Continuing education support",
      "Paid time off and holidays"
    ],
    
    companyInfo: {
      size: "200-500 employees",
      industry: "Clinical Research",
      founded: "2015",
      description: "HealthTech Solutions is a leading clinical research organization dedicated to advancing healthcare through innovative research methodologies and cutting-edge technology."
    }
  };

  const handleApplyNow = () => {
    navigate(`/job-application/${jobId}`, {
      state: { job }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/job-scan" className="flex items-center space-x-2 text-slate-600 hover:text-navy-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Job Search</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <Card className="bg-white border-slate-200 shadow-lg mb-8 rounded-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 bg-autumn-100 text-autumn-700 rounded-full text-sm font-medium mb-4">
                    <Target className="w-4 h-4 mr-2" />
                    {job.match}% Match Score
                  </div>
                  
                  <h1 className="text-3xl font-bold text-navy-800 mb-2">{job.title}</h1>
                  <div className="flex items-center text-slate-600 mb-4">
                    <Building className="w-5 h-5 mr-2" />
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.posted}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700">{job.type}</Badge>
                    <Badge className="bg-green-100 text-green-700">{job.experience}</Badge>
                    <Badge className="bg-purple-100 text-purple-700">{job.salary}</Badge>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 md:ml-8">
                  <Button 
                    size="lg"
                    onClick={handleApplyNow}
                    className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">AI Match Analysis</span>
                  <span className="text-autumn-600 font-medium">{job.match}% compatible</span>
                </div>
                <Progress value={job.match} className="mt-2 h-3" />
                <p className="text-sm text-slate-500 mt-2">
                  Based on your healthcare background and clinical experience
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                    {job.description}
                  </div>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-autumn-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-navy-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply */}
              <Card className="bg-gradient-to-br from-navy-50 to-autumn-50 border-navy-200 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-navy-800">Quick Apply</h3>
                    <p className="text-sm text-slate-600 mt-1">AI-generated resume & cover letter</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white font-semibold rounded-xl"
                  >
                    Apply with AI
                  </Button>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">About {job.company}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-slate-500">Company Size</span>
                    <p className="font-medium text-slate-700">{job.companyInfo.size}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Industry</span>
                    <p className="font-medium text-slate-700">{job.companyInfo.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Founded</span>
                    <p className="font-medium text-slate-700">{job.companyInfo.founded}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">About</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{job.companyInfo.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Info */}
              <Card className="bg-white border-slate-200 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Salary Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{job.salary}</div>
                    <p className="text-sm text-slate-600">Annual salary range</p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-500">
                        Salary estimates based on similar roles in your area
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
