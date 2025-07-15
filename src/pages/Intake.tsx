import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, User, BookOpen, Award, Target, Brain, ChevronRight, Plus, Trash2, ExternalLink, Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Intake = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    
    // Education Background
    education: [
      {
        id: 1,
        degree: '',
        specialization: '',
        degreeType: '', // 'ug' or 'pg'
        completionStatus: '', // 'completed' or 'pursuing'
        completionYear: '',
        currentYear: '' // for pursuing students
      }
    ],
    
    // Skills & Experience
    technicalSkills: [''],
    softSkills: [''],
    certifications: [
      {
        id: 1,
        name: '',
        credentialId: '',
        issuer: '',
        year: ''
      }
    ],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        isPublished: false,
        projectUrl: '',
        technologies: ''
      }
    ],
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        duration: '',
        description: ''
      }
    ],
    
    // Career Goals
    preferredIndustry: '',
    careerGoals: '',
    jobLocations: '',
    salaryExpectation: '',
    workStyle: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!user) {
        console.error("User not logged in");
        // Handle not logged in case, maybe redirect to login
        return;
      }
      const { data, error } = await supabase
       .from('user_profiles')
       .upsert([{
         id: user.id,
         email: formData.email,
         name: formData.fullName,
         education: JSON.stringify(formData.education),
         skills: [...formData.technicalSkills, ...formData.softSkills].filter(Boolean),
         experience: JSON.stringify(formData.experience),
         preferred_industries: [formData.preferredIndustry].filter(Boolean),
         preferred_locations: formData.jobLocations.split(',').map(s => s.trim()).filter(Boolean),
         certifications: formData.certifications
       }])
       .select('id')
       .single()

     if (error) {
       console.error("Error upserting profile:", error)
       throw error
     }
     
     if (data) {
        navigate(`/analysis/${formData.preferredIndustry}`)
     }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <EducationStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SkillsExperienceStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <CareerGoalsStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-lg">Zane AI</span>
              <p className="text-slate-500 text-xs">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Career Intelligence Intake
            </div>
            <h1 className="text-3xl font-bold text-navy-800 mb-2">Tell Zane AI About Yourself</h1>
            <p className="text-slate-600">Help me understand your profile to build the perfect career path</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-8 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-navy-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-slate-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-100" />
          </div>

          <div className="flex justify-between mt-8 px-4">
            {[
              { step: 1, icon: User, label: "Personal Info", emoji: "👤" },
              { step: 2, icon: BookOpen, label: "Education", emoji: "🎓" },
              { step: 3, icon: Award, label: "Skills & Experience", emoji: "💡" },
              { step: 4, icon: Target, label: "Career Goals", emoji: "🎯" }
            ].map((item) => (
              <div key={item.step} className={`flex flex-col items-center transition-all duration-300 ${currentStep >= item.step ? 'text-navy-600' : 'text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep >= item.step ? 'bg-gradient-to-r from-navy-500 to-autumn-500 shadow-lg scale-110' : 'bg-slate-100'
                }`}>
                  {currentStep >= item.step ? (
                    <item.icon className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-lg">{item.emoji}</span>
                  )}
                </div>
                <span className="text-xs text-center hidden sm:block font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white border border-slate-200 shadow-xl rounded-xl animate-scale-in">
            <CardContent className="p-8">
              {renderStep()}
              
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700 px-6 py-2 rounded-xl transition-all duration-300"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {currentStep === totalSteps ? (
                    <>
                      Analyze My Profile 
                      <Brain className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 pb-8">
          <div className="flex items-center justify-center space-x-3 text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-navy-400 to-autumn-400 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Powered by ZaneProEd</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalInfoStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Personal Information</h2>
      <p className="text-slate-600">👤 Let's start with your basic details</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-navy-700 font-medium">Full Name *</Label>
        <Input 
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-navy-700 font-medium">Email Address *</Label>
        <Input 
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="your.email@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-navy-700 font-medium">Phone Number</Label>
        <Input 
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="+91 9876543210"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-navy-700 font-medium">Current Location *</Label>
        <Input 
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="City, State"
        />
      </div>
    </div>
  </div>
);

const EducationStep = ({ formData, updateFormData }: any) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      specialization: '',
      degreeType: '',
      completionStatus: '',
      completionYear: '',
      currentYear: ''
    };
    updateFormData('education', [...formData.education, newEducation]);
  };

  const removeEducation = (id: number) => {
    updateFormData('education', formData.education.filter((edu: any) => edu.id !== id));
  };

  const updateEducation = (id: number, field: string, value: string) => {
    updateFormData('education', formData.education.map((edu: any) => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const degreeOptions = {
    ug: [
      { value: "bpharm", label: "B.Pharm" },
      { value: "dpharm", label: "D.Pharm" },
      { value: "bsc-nursing", label: "B.Sc Nursing" },
      { value: "gnm", label: "GNM (Nursing)" },
      { value: "bpt", label: "BPT (Physiotherapy)" },
      { value: "bmlt", label: "BMLT (Medical Lab Technology)" },
      { value: "boptom", label: "B.Optom (Optometry)" },
      { value: "btech", label: "B.Tech" },
      { value: "be", label: "B.E." },
      { value: "bsc", label: "B.Sc" },
      { value: "bcom", label: "B.Com" },
      { value: "ba", label: "B.A." },
      { value: "bba", label: "BBA" }
    ],
    pg: [
      { value: "pharm-d", label: "Pharm.D" },
      { value: "mpharm", label: "M.Pharm" },
      { value: "msc-nursing", label: "M.Sc Nursing" },
      { value: "mpt", label: "MPT (Physiotherapy)" },
      { value: "mtech", label: "M.Tech" },
      { value: "me", label: "M.E." },
      { value: "msc", label: "M.Sc" },
      { value: "mcom", label: "M.Com" },
      { value: "ma", label: "M.A." },
      { value: "mba", label: "MBA" }
    ]
  };

  const currentYearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year"];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-navy-800 mb-2">Education Background</h2>
        <p className="text-slate-600">🎓 Tell me about your academic journey</p>
      </div>
      
      {formData.education.map((edu: any, index: number) => (
        <div key={edu.id} className="bg-slate-50 rounded-xl p-6 border-l-4 border-navy-400 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-navy-700">
              Education {index + 1}
            </h3>
            {formData.education.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label className="text-navy-700 font-medium">Degree Type *</Label>
              <Select value={edu.degreeType} onValueChange={(value) => updateEducation(edu.id, 'degreeType', value)}>
                <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                  <SelectValue placeholder="Select degree type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-lg">
                  <SelectItem value="ug">Undergraduate (UG)</SelectItem>
                  <SelectItem value="pg">Postgraduate (PG)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-navy-700 font-medium">Completion Status *</Label>
              <Select value={edu.completionStatus} onValueChange={(value) => updateEducation(edu.id, 'completionStatus', value)}>
                <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-lg">
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pursuing">Currently Pursuing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label className="text-navy-700 font-medium">Degree *</Label>
              <Select 
                value={edu.degree} 
                onValueChange={(value) => updateEducation(edu.id, 'degree', value)}
                disabled={!edu.degreeType}
              >
                <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-lg">
                  {edu.degreeType && degreeOptions[edu.degreeType as keyof typeof degreeOptions]?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-navy-700 font-medium">Specialization</Label>
              <Input 
                value={edu.specialization}
                onChange={(e) => updateEducation(edu.id, 'specialization', e.target.value)}
                className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                placeholder="e.g., Clinical Pharmacy"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {edu.completionStatus === 'completed' ? (
              <div className="space-y-2">
                <Label className="text-navy-700 font-medium">Year of Completion *</Label>
                <Select value={edu.completionYear} onValueChange={(value) => updateEducation(edu.id, 'completionYear', value)}>
                  <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-lg">
                    {Array.from({length: 36}, (_, i) => 2025 - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : edu.completionStatus === 'pursuing' ? (
              <div className="space-y-2">
                <Label className="text-navy-700 font-medium">Current Year of Study *</Label>
                <Select value={edu.currentYear} onValueChange={(value) => updateEducation(edu.id, 'currentYear', value)}>
                  <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                    <SelectValue placeholder="Select current year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-lg">
                    {currentYearOptions.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={addEducation}
          className="bg-white border-2 border-navy-200 text-navy-600 hover:bg-navy-50 hover:border-navy-300 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Degree
        </Button>
      </div>
    </div>
  );
};

const SkillsExperienceStep = ({ formData, updateFormData }: any) => {
  const addSkill = (type: 'technicalSkills' | 'softSkills') => {
    updateFormData(type, [...formData[type], '']);
  };

  const removeSkill = (type: 'technicalSkills' | 'softSkills', index: number) => {
    updateFormData(type, formData[type].filter((_: any, i: number) => i !== index));
  };

  const updateSkill = (type: 'technicalSkills' | 'softSkills', index: number, value: string) => {
    updateFormData(type, formData[type].map((skill: string, i: number) => i === index ? value : skill));
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      credentialId: '',
      issuer: '',
      year: ''
    };
    updateFormData('certifications', [...formData.certifications, newCert]);
  };

  const removeCertification = (id: number) => {
    updateFormData('certifications', formData.certifications.filter((cert: any) => cert.id !== id));
  };

  const updateCertification = (id: number, field: string, value: string) => {
    updateFormData('certifications', formData.certifications.map((cert: any) => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      isPublished: false,
      projectUrl: '',
      technologies: ''
    };
    updateFormData('projects', [...formData.projects, newProject]);
  };

  const removeProject = (id: number) => {
    updateFormData('projects', formData.projects.filter((project: any) => project.id !== id));
  };

  const updateProject = (id: number, field: string, value: any) => {
    updateFormData('projects', formData.projects.map((project: any) => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: ''
    };
    updateFormData('experience', [...formData.experience, newExp]);
  };

  const removeExperience = (id: number) => {
    updateFormData('experience', formData.experience.filter((exp: any) => exp.id !== id));
  };

  const updateExperience = (id: number, field: string, value: string) => {
    updateFormData('experience', formData.experience.map((exp: any) => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-navy-800 mb-2">Skills & Experience</h2>
        <p className="text-slate-600">💡 Share your skills, projects, and experiences</p>
      </div>
      
      {/* Technical Skills */}
      <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-navy-400">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-navy-700">Technical Skills</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addSkill('technicalSkills')}
            className="text-navy-600 hover:text-navy-700 hover:bg-navy-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-3">
          {formData.technicalSkills.map((skill: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input 
                value={skill}
                onChange={(e) => updateSkill('technicalSkills', index, e.target.value)}
                className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                placeholder="e.g., React, Node.js, Python, etc."
              />
              {formData.technicalSkills.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSkill('technicalSkills', index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bg-autumn-50 rounded-xl p-6 border-l-4 border-autumn-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-navy-700">Soft Skills</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addSkill('softSkills')}
            className="text-navy-600 hover:text-navy-700 hover:bg-navy-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-3">
          {formData.softSkills.map((skill: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input 
                value={skill}
                onChange={(e) => updateSkill('softSkills', index, e.target.value)}
                className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                placeholder="e.g., Leadership, Communication, etc."
              />
              {formData.softSkills.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSkill('softSkills', index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-navy-700">Certifications</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addCertification}
            className="text-navy-600 hover:text-navy-700 hover:bg-navy-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Certification
          </Button>
        </div>
        <div className="space-y-4">
          {formData.certifications.map((cert: any, index: number) => (
            <div key={cert.id} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-navy-600">Certification {index + 1}</span>
                {formData.certifications.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Certification Name</Label>
                  <Input 
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="e.g., AWS Certified Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Credential ID</Label>
                  <Input 
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="e.g., ABC123XYZ"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Issuing Organization</Label>
                  <Input 
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Year Obtained</Label>
                  <Select value={cert.year} onValueChange={(value) => updateCertification(cert.id, 'year', value)}>
                    <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-lg">
                      {Array.from({length: 26}, (_, i) => 2025 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-navy-700">Projects</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addProject}
            className="text-navy-600 hover:text-navy-700 hover:bg-navy-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {formData.projects.map((project: any, index: number) => (
            <div key={project.id} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-navy-600">Project {index + 1}</span>
                {formData.projects.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-navy-700 font-medium">Project Name</Label>
                    <Input 
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                      placeholder="e.g., E-commerce Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-navy-700 font-medium">Technologies Used</Label>
                    <Input 
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                      className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Project Description</Label>
                  <Textarea 
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="Describe what the project does and your role in it..."
                    rows={2}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`published-${project.id}`}
                      checked={project.isPublished}
                      onChange={(e) => updateProject(project.id, 'isPublished', e.target.checked)}
                      className="w-4 h-4 text-navy-600 border-slate-300 rounded focus:ring-navy-500"
                    />
                    <Label htmlFor={`published-${project.id}`} className="text-navy-700 font-medium">
                      Published/Live
                    </Label>
                  </div>
                  {project.isPublished && (
                    <div className="flex-1 space-y-2">
                      <Input 
                        value={project.projectUrl}
                        onChange={(e) => updateProject(project.id, 'projectUrl', e.target.value)}
                        className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                        placeholder="https://your-project-url.com"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-navy-700">Work Experience</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addExperience}
            className="text-navy-600 hover:text-navy-700 hover:bg-navy-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </div>
        <div className="space-y-4">
          {formData.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-navy-600">Experience {index + 1}</span>
                {formData.experience.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Company/Organization</Label>
                  <Input 
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="e.g., Tech Company Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-navy-700 font-medium">Position/Role</Label>
                  <Input 
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                    placeholder="e.g., Software Developer Intern"
                  />
                </div>
              </div>
              <div className="mb-3">
                <Label className="text-navy-700 font-medium">Duration</Label>
                <Input 
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                  placeholder="e.g., June 2023 - August 2023"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-navy-700 font-medium">Description</Label>
                <Textarea 
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
                  placeholder="Describe your responsibilities and achievements..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerGoalsStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Target className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Career Goals & Preferences</h2>
      <p className="text-slate-600">🎯 Help me understand your healthcare career aspirations</p>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Preferred Industry *</Label>
        <Select value={formData.preferredIndustry} onValueChange={(value) => updateFormData('preferredIndustry', value)}>
          <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
            <SelectValue placeholder="Select your preferred healthcare industry" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 rounded-lg">
            <SelectItem value="clinical-trials-research">🔬 Clinical Trials & Research</SelectItem>
            <SelectItem value="drug-safety-monitoring">⚠️ Drug Safety Monitoring</SelectItem>
            <SelectItem value="clinical-data-handling">📊 Clinical Data Handling</SelectItem>
            <SelectItem value="quality-control-assurance">✅ Quality Control & Assurance</SelectItem>
            <SelectItem value="medical-communications">📝 Medical Communications</SelectItem>
            <SelectItem value="regulatory-compliance">📋 Regulatory & Compliance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Career Goals & Aspirations *</Label>
        <Textarea 
          value={formData.careerGoals}
          onChange={(e) => updateFormData('careerGoals', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Describe your healthcare career goals, dream job, or what you want to achieve in the next 2-5 years in the healthcare field..."
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Preferred Job Locations</Label>
          <Textarea 
            value={formData.jobLocations}
            onChange={(e) => updateFormData('jobLocations', e.target.value)}
            className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
            placeholder="e.g., Bangalore, Mumbai, Remote, Hyderabad, International..."
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Expected Salary Range</Label>
          <Select value={formData.salaryExpectation} onValueChange={(value) => updateFormData('salaryExpectation', value)}>
            <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              <SelectItem value="3-5">₹3-5 LPA</SelectItem>
              <SelectItem value="5-8">₹5-8 LPA</SelectItem>
              <SelectItem value="8-12">₹8-12 LPA</SelectItem>
              <SelectItem value="12-18">₹12-18 LPA</SelectItem>
              <SelectItem value="18+">₹18+ LPA</SelectItem>
              <SelectItem value="international">International Opportunities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Work Style Preference</Label>
        <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
          <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
            <SelectValue placeholder="Select work style" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 rounded-lg">
            <SelectItem value="clinical-onsite">🏥 Clinical/Hospital - On-site</SelectItem>
            <SelectItem value="hybrid">🏢 Hybrid (2-3 days office)</SelectItem>
            <SelectItem value="remote">💻 Fully Remote</SelectItem>
            <SelectItem value="flexible">⚡ Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default Intake;
