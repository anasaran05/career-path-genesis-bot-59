
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, FileText, TrendingUp, Plus, Search, User, Eye, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RecruiterDashboard = () => {
  const { userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const mockJobs = [
    {
      id: 1,
      title: "Clinical Research Associate",
      applications: 24,
      status: "active",
      location: "Mumbai",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Pharmaceutical Sales Manager",
      applications: 18,
      status: "active",
      location: "Delhi",
      type: "Full-time"
    }
  ];

  const mockApplications = [
    {
      id: 1,
      candidateName: "Priya Sharma",
      position: "Clinical Research Associate",
      experience: "2 years",
      status: "applied",
      appliedDate: "2024-01-15"
    },
    {
      id: 2,
      candidateName: "Rahul Patel",
      position: "Clinical Research Associate",
      experience: "3 years",
      status: "shortlisted",
      appliedDate: "2024-01-14"
    }
  ];

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
              <p className="text-slate-600 text-sm">Talent Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-navy-700 font-medium">
              {userProfile?.recruiter_profiles?.[0]?.company_name || 'Company'}
            </span>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to the ZaneProEd Talent Portal
            </h1>
            <p className="text-xl opacity-90">Hire Smart, Hire Right.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'jobs', label: 'Job Postings', icon: FileText },
            { id: 'applications', label: 'Applications', icon: Users },
            { id: 'post-job', label: 'Post New Job', icon: Plus }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 rounded-xl ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-navy-600 to-autumn-500 text-white' 
                  : 'border-2 border-slate-200 text-navy-700 hover:bg-navy-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-navy-800 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Active Jobs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">8</div>
                <p className="text-slate-600 text-sm">Currently hiring</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-navy-800 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Total Applications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">247</div>
                <p className="text-slate-600 text-sm">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-navy-800 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Interviews Scheduled</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">15</div>
                <p className="text-slate-600 text-sm">Next 7 days</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-navy-800 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Hired</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">12</div>
                <p className="text-slate-600 text-sm">This quarter</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Your Job Postings</h2>
              <Button 
                onClick={() => setActiveTab('post-job')}
                className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="grid gap-4">
              {mockJobs.map((job) => (
                <Card key={job.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-navy-800">{job.title}</CardTitle>
                        <CardDescription className="text-slate-600">
                          {job.location} • {job.type}
                        </CardDescription>
                      </div>
                      <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-navy-700 font-medium">
                        {job.applications} applications
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-navy-600 text-white rounded-xl">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Recent Applications</h2>
            
            <div className="grid gap-4">
              {mockApplications.map((application) => (
                <Card key={application.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-navy-800">{application.candidateName}</CardTitle>
                          <CardDescription className="text-slate-600">
                            Applied for {application.position} • {application.experience} experience
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={application.status === 'shortlisted' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">
                        Applied on {application.appliedDate}
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4 mr-2" />
                          View Resume
                        </Button>
                        <Button size="sm" className="bg-green-600 text-white rounded-xl">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Shortlist
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 rounded-xl">
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'post-job' && (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-navy-800 text-2xl">Post a New Job</CardTitle>
                <CardDescription>Fill in the details to post your job opening</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Job Title</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl" placeholder="e.g., Clinical Research Associate" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Location</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl" placeholder="e.g., Mumbai, Maharashtra" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-navy-700 font-medium">Job Description</label>
                  <Textarea 
                    className="bg-slate-50 border-slate-200 rounded-xl" 
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Experience Level</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl" placeholder="e.g., 2-4 years" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Salary Range</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl" placeholder="e.g., ₹6-10 LPA" />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 text-white py-3 rounded-xl shadow-lg">
                  Post Job Opening
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
