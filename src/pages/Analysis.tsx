
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, TrendingUp, Users, Briefcase, Star, CheckCircle } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const studentData = location.state?.studentData;

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 mb-4">No analysis data found. Please complete the intake form first.</p>
            <Link to="/intake">
              <Button>Go to Intake Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const industryData = getIndustryData(studentData.preferredIndustry);
  const userName = studentData.fullName?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-lg">Zane AI</span>
              <p className="text-slate-500 text-xs">Career Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Greeting */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-navy-800 mb-2">Hi {userName}! 👋</h1>
            <p className="text-xl text-slate-600">Here's your personalized career analysis for <span className="font-semibold text-navy-700">{industryData.name}</span></p>
          </div>

          {/* Recommended Careers */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800">Recommended Career Paths</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {industryData.careers.map((career, index) => (
                <Card key={index} className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold text-navy-800">{career.title}</CardTitle>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        <Star className="w-3 h-3" />
                        <span>{career.matchScore}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{career.description}</p>
                    
                    {/* Match Score Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Match Score</span>
                        <span className="font-medium text-navy-700">{career.matchScore}%</span>
                      </div>
                      <Progress value={career.matchScore} className="h-2" />
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Salary</p>
                        <p className="text-sm font-semibold text-navy-700">₹{career.salary}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Growth</p>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          career.growth === 'High' ? 'bg-green-100 text-green-700' :
                          career.growth === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {career.growth}
                        </span>
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Key Skills to Upskill</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-navy-100 text-navy-700 px-2 py-1 rounded-md text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Priority Skills */}
          <Card className="bg-gradient-to-r from-navy-50 to-blue-50 border border-navy-200 shadow-lg animate-fade-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-navy-800">Priority Skills for This Industry</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">High-value skills essential for success in {industryData.name}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {industryData.prioritySkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-navy-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="text-center mt-12">
            <Link to="/job-scan">
              <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Find Matching Jobs
                <Users className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Industry data mapping
const getIndustryData = (industryKey: string) => {
  const industryMap: Record<string, any> = {
    'clinical-trials-research': {
      name: 'Clinical Trials & Research',
      careers: [
        {
          title: 'Clinical Research Associate (CRA)',
          description: 'Oversees clinical trials to ensure compliance with protocols and GCP guidelines.',
          salary: '4.5–8 LPA',
          growth: 'High',
          skills: ['GCP', 'protocol writing', 'site monitoring', 'ICH guidelines'],
          matchScore: 85
        },
        {
          title: 'Clinical Trial Assistant (CTA)',
          description: 'Supports study management, document handling, and trial logistics.',
          salary: '3–5 LPA',
          growth: 'Medium',
          skills: ['TMF management', 'MS Excel', 'trial master file', 'documentation'],
          matchScore: 78
        },
        {
          title: 'Site Coordinator (CRC)',
          description: 'Manages patient enrollment and study execution at clinical trial sites.',
          salary: '2.5–4.5 LPA',
          growth: 'Medium',
          skills: ['informed consent', 'patient interaction', 'GCP', 'site SOPs'],
          matchScore: 72
        },
        {
          title: 'Project Manager – Clinical Trials',
          description: 'Leads entire clinical projects from planning to close-out.',
          salary: '10–20 LPA',
          growth: 'High',
          skills: ['budgeting', 'timelines', 'team leadership', 'risk mitigation'],
          matchScore: 68
        }
      ],
      prioritySkills: ['GCP', 'Protocol Writing', 'Clinical Trial Lifecycle', 'Ethics Committee Handling', 'ICH-GCP', 'Project Planning']
    },
    'drug-safety-monitoring': {
      name: 'Drug Safety Monitoring',
      careers: [
        {
          title: 'Pharmacovigilance Associate',
          description: 'Handles adverse event collection, processing, and reporting.',
          salary: '4–7 LPA',
          growth: 'High',
          skills: ['MedDRA', 'case processing', 'WHO-UMC causality', 'safety databases'],
          matchScore: 88
        },
        {
          title: 'Signal Detection Analyst',
          description: 'Monitors safety data trends and detects risk signals.',
          salary: '6–10 LPA',
          growth: 'High',
          skills: ['data mining', 'disproportionality analysis', 'epidemiology'],
          matchScore: 77
        },
        {
          title: 'Aggregate Report Writer',
          description: 'Prepares PSURs, DSURs, and other safety reports.',
          salary: '6–12 LPA',
          growth: 'Medium',
          skills: ['medical writing', 'regulatory timelines', 'ICH-E2E'],
          matchScore: 75
        },
        {
          title: 'Drug Safety Specialist',
          description: 'Leads case review, narrative writing, and quality checks.',
          salary: '8–15 LPA',
          growth: 'Medium',
          skills: ['literature screening', 'SAE reconciliation', 'query resolution'],
          matchScore: 73
        }
      ],
      prioritySkills: ['MedDRA Coding', 'Argus Safety', 'ICSR Processing', 'Narrative Writing', 'E2B Guidelines', 'Literature Surveillance']
    },
    'clinical-data-handling': {
      name: 'Clinical Data Handling',
      careers: [
        {
          title: 'Clinical Data Manager',
          description: 'Designs data capture systems, performs cleaning and ensures data integrity.',
          salary: '5–10 LPA',
          growth: 'High',
          skills: ['EDC systems', 'CDM plans', 'query management', 'CDISC standards'],
          matchScore: 82
        },
        {
          title: 'Clinical Data Analyst',
          description: 'Analyzes trial data to support decision-making and regulatory submission.',
          salary: '4–8 LPA',
          growth: 'Medium',
          skills: ['SAS', 'R', 'SQL', 'CDASH'],
          matchScore: 75
        },
        {
          title: 'Data Validation Associate',
          description: 'Ensures collected trial data is accurate, complete, and consistent.',
          salary: '3–6 LPA',
          growth: 'Medium',
          skills: ['DCF resolution', 'logic checks', 'SDV review'],
          matchScore: 70
        },
        {
          title: 'EDC Programmer',
          description: 'Develops and manages electronic case report forms.',
          salary: '6–12 LPA',
          growth: 'Medium',
          skills: ['Medidata Rave', 'eCRF design', 'UAT testing'],
          matchScore: 68
        }
      ],
      prioritySkills: ['EDC (Medidata/Rave)', 'SDTM', 'CDASH', 'Data Validation', 'Query Management', 'SAS Programming']
    },
    'quality-control-assurance': {
      name: 'Quality Control & Assurance',
      careers: [
        {
          title: 'Quality Assurance Executive',
          description: 'Ensures SOP compliance and conducts internal audits.',
          salary: '4–7 LPA',
          growth: 'Medium',
          skills: ['CAPA', 'deviation management', 'QMS', 'GxP'],
          matchScore: 80
        },
        {
          title: 'GCP Auditor',
          description: 'Performs audits of trials, vendors, and systems.',
          salary: '6–12 LPA',
          growth: 'High',
          skills: ['audit planning', 'SOP review', 'inspection readiness'],
          matchScore: 77
        },
        {
          title: 'Quality Control Analyst',
          description: 'Tests materials/products and ensures laboratory compliance.',
          salary: '3.5–6.5 LPA',
          growth: 'Medium',
          skills: ['analytical instruments', 'sampling', 'documentation'],
          matchScore: 72
        },
        {
          title: 'Compliance Officer – Clinical QA',
          description: 'Manages regulatory compliance, audit response, and continuous improvement.',
          salary: '8–14 LPA',
          growth: 'High',
          skills: ['audit trail', 'deviation tracking', 'compliance metrics'],
          matchScore: 74
        }
      ],
      prioritySkills: ['CAPA', 'QMS', 'Risk-Based Monitoring', 'Audit Management', 'GCP/GLP/GMP', 'SOP Development']
    },
    'medical-communications': {
      name: 'Medical Communications',
      careers: [
        {
          title: 'Medical Writer – Clinical',
          description: 'Drafts CSRs, protocols, informed consent forms.',
          salary: '5–9 LPA',
          growth: 'High',
          skills: ['ICH guidelines', 'regulatory writing', 'referencing tools'],
          matchScore: 85
        },
        {
          title: 'Scientific Content Developer',
          description: 'Creates slide decks, publications, and scientific narratives.',
          salary: '4–8 LPA',
          growth: 'Medium',
          skills: ['literature review', 'storytelling', 'publication guidelines'],
          matchScore: 78
        },
        {
          title: 'Publication Manager',
          description: 'Plans and manages manuscripts and conference posters.',
          salary: '7–14 LPA',
          growth: 'Medium',
          skills: ['ICMJE', 'GPP', 'journal targeting', 'author coordination'],
          matchScore: 73
        },
        {
          title: 'Regulatory Medical Writer',
          description: 'Specializes in IBs, CTDs, and briefing documents.',
          salary: '6–12 LPA',
          growth: 'Medium',
          skills: ['Module 2/3 writing', 'eCTD', 'submission standards'],
          matchScore: 76
        }
      ],
      prioritySkills: ['Medical Writing', 'Literature Analysis', 'GPP Guidelines', 'Storytelling', 'EndNote/Mendeley', 'Scientific Accuracy']
    },
    'regulatory-compliance': {
      name: 'Regulatory & Compliance',
      careers: [
        {
          title: 'Regulatory Affairs Associate',
          description: 'Manages regulatory submissions and lifecycle maintenance.',
          salary: '4–8 LPA',
          growth: 'High',
          skills: ['CTD', 'eCTD', 'submission tracking', 'HA communication'],
          matchScore: 82
        },
        {
          title: 'Labeling Specialist',
          description: 'Prepares and reviews drug labeling for global markets.',
          salary: '5–9 LPA',
          growth: 'Medium',
          skills: ['SPL', 'CCDS', 'labeling review', 'FDA/EMA guidelines'],
          matchScore: 76
        },
        {
          title: 'Regulatory CMC Specialist',
          description: 'Focuses on chemistry-manufacturing-controls documentation.',
          salary: '6–11 LPA',
          growth: 'Medium',
          skills: ['Module 3', 'formulation knowledge', 'change control'],
          matchScore: 74
        },
        {
          title: 'Regulatory Intelligence Analyst',
          description: 'Tracks global regulation changes and trends.',
          salary: '5–10 LPA',
          growth: 'Medium',
          skills: ['HA guidelines', 'regulatory strategy', 'competitive analysis'],
          matchScore: 70
        }
      ],
      prioritySkills: ['CTD/eCTD', 'Regulatory Submissions', 'Labeling', 'Regulatory Writing', 'HA Communication', 'Global Guidelines (FDA/EMA)']
    }
  };

  return industryMap[industryKey] || industryMap['clinical-trials-research'];
};

export default Analysis;
