
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Copy, CheckCircle, User, GraduationCap, Briefcase } from "lucide-react";

interface ManualApplicationModalProps {
  open: boolean;
  onClose: () => void;
  job?: any;
}

const ManualApplicationModal: React.FC<ManualApplicationModalProps> = ({
  open,
  onClose,
  job
}) => {
  const [resumeCopied, setResumeCopied] = useState(false);
  const [coverLetterCopied, setCoverLetterCopied] = useState(false);

  const sampleResume = `═══════════════════════════════════════════════════════════════
                        AISHA RAHMAN
                   👩‍⚕️ Healthcare Professional | Clinical Research Specialist
═══════════════════════════════════════════════════════════════

📧 aisha.rahman@email.com | 📱 +91 90000 00000 | 🔗 linkedin.com/in/aisharahman

═══════════════════════════════════════════════════════════════
👩‍⚕️ PROFILE SUMMARY
═══════════════════════════════════════════════════════════════
Recent Pharm.D graduate with hands-on clinical research experience seeking to advance 
healthcare outcomes through evidence-based research. Passionate about protocol management, 
regulatory compliance, and supporting investigational sites in groundbreaking clinical trials.

═══════════════════════════════════════════════════════════════
🎓 EDUCATION
═══════════════════════════════════════════════════════════════
Doctor of Pharmacy (Pharm.D) | JSS College of Pharmacy | 2023
• Specialized coursework in Clinical Pharmacology and Research Methodology
• Academic projects in Drug Safety and Pharmacovigilance

═══════════════════════════════════════════════════════════════
🛠 TECHNICAL SKILLS
═══════════════════════════════════════════════════════════════
Clinical Research:      • Clinical Trials Management • Protocol Documentation
                       • ICH-GCP Guidelines • eCRF Data Entry
Regulatory:            • Pharmacovigilance Basics • Regulatory Filing Support
Software & Tools:      • MS Excel (Advanced) • Clinical Data Management Systems
Quality Assurance:     • Site Monitoring • Protocol Compliance

═══════════════════════════════════════════════════════════════
🤝 INTERNSHIP EXPERIENCE
═══════════════════════════════════════════════════════════════
Clinical Research Intern | Apollo Hospitals | 6 months (2023)
• Supported site management activities for Phase II and III clinical trials
• Assisted in protocol documentation and regulatory filing processes
• Coordinated with principal investigators and research staff
• Maintained accurate trial records and ensured GCP compliance
• Contributed to patient recruitment strategies and data quality checks

═══════════════════════════════════════════════════════════════
🏅 CERTIFICATIONS
═══════════════════════════════════════════════════════════════
• Good Clinical Practice (GCP) - NIH Training Center
• Introduction to Pharmacovigilance - Coursera
• Clinical Research Fundamentals (In Progress)

═══════════════════════════════════════════════════════════════
💬 SOFT SKILLS
═══════════════════════════════════════════════════════════════
• Strong attention to detail and organizational skills
• Excellent communication and interpersonal abilities
• Problem-solving mindset with analytical thinking
• Team collaboration and cross-functional coordination
• Adaptability in fast-paced research environments`;

  const sampleCoverLetter = `Dear Hiring Manager,
MedInsight Research

I am writing to express my strong interest in the Clinical Research Coordinator (Trainee) position at MedInsight Research. As a recently graduated Pharm.D professional with specialized clinical research experience, I am excited about the opportunity to contribute to your team's mission of advancing healthcare through innovative research methodologies.

My educational background from JSS College of Pharmacy, combined with my 6-month internship as a Clinical Research Intern at Apollo Hospitals, has provided me with a solid foundation in clinical trial management, protocol documentation, and regulatory compliance. During my internship, I actively supported site management activities for Phase II and III trials, collaborated with principal investigators, and maintained meticulous trial records while ensuring adherence to ICH-GCP guidelines.

I have strengthened my qualifications through relevant certifications including Good Clinical Practice (GCP) from NIH Training Center and Introduction to Pharmacovigilance from Coursera. My technical skills in eCRF data entry, MS Excel, and clinical data management systems, coupled with my understanding of regulatory filing processes, align perfectly with the requirements for this trainee position. I am particularly drawn to MedInsight Research's reputation for excellence in clinical research and would welcome the opportunity to grow my career while contributing to groundbreaking studies.

I am eager to bring my fresh perspective, attention to detail, and genuine passion for clinical research to your team. I would be grateful for the opportunity to discuss how my background and enthusiasm can contribute to MedInsight Research's continued success. Thank you for considering my application.

Sincerely,
Aisha Rahman
Pharm.D Graduate | Clinical Research Professional`;

  const handleCopyResume = () => {
    navigator.clipboard.writeText(sampleResume);
    setResumeCopied(true);
    setTimeout(() => setResumeCopied(false), 2000);
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(sampleCoverLetter);
    setCoverLetterCopied(true);
    setTimeout(() => setCoverLetterCopied(false), 2000);
  };

  const handleDownloadResume = () => {
    const blob = new Blob([sampleResume], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aisha_Rahman_Resume_${job?.title?.replace(/\s+/g, '_') || 'Clinical_Research'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCoverLetter = () => {
    const blob = new Blob([sampleCoverLetter], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aisha_Rahman_CoverLetter_${job?.title?.replace(/\s+/g, '_') || 'Clinical_Research'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Professional Application Package - Aisha Rahman
          </DialogTitle>
          {job && (
            <div className="flex items-center gap-4 mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  {job.title || 'Clinical Research Coordinator (Trainee)'}
                </h3>
                <p className="text-white/70">{job.company || 'MedInsight Research'} • {job.location || 'Hyderabad'}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">{job.type || 'Full-time'}</Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">{job.salary || 'Trainee Level'}</Badge>
              </div>
            </div>
          )}
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Resume Section */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  ATS-Optimized Resume
                </h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCopyResume} 
                    className="border-white/30 text-white bg-zinc-950 hover:bg-zinc-800 transition-colors"
                  >
                    {resumeCopied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {resumeCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleDownloadResume} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-white/80 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Professional healthcare resume • ATS-friendly format
                </div>
                <div className="bg-black/30 rounded p-4 text-xs text-white/90 font-mono whitespace-pre-wrap max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                  {sampleResume}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Healthcare Keywords</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>ATS Compatible</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Professional Design</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Skills Optimized</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter Section */}
          <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  Tailored Cover Letter
                </h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCopyCoverLetter} 
                    className="border-white/30 text-white bg-zinc-950 hover:bg-zinc-800 transition-colors"
                  >
                    {coverLetterCopied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {coverLetterCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleDownloadCoverLetter} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
                <div className="text-xs text-white/80 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Personalized for MedInsight Research • Professional tone
                </div>
                <div className="bg-black/30 rounded p-4 text-xs text-white/90 font-mono whitespace-pre-wrap max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                  {sampleCoverLetter}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-purple-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Company Focused</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Role Specific</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Fresh Graduate Tone</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Confident Approach</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Instructions */}
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30 mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <ExternalLink className="w-3 h-3 text-white" />
              </div>
              Ready to Apply?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">📋 Application Steps:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>1. Copy or download both documents</li>
                  <li>2. Review and customize if needed</li>
                  <li>3. Submit through company portal</li>
                  <li>4. Follow up within 1 week</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Save as PDF to preserve formatting</li>
                  <li>• Use same file names for easy tracking</li>
                  <li>• Double-check contact details</li>
                  <li>• Prepare for potential follow-up questions</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all" 
                onClick={() => window.open(job?.link || 'https://medinsight-research.com/careers', '_blank')}
              >
                Apply Now at {job?.company || 'MedInsight Research'}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={onClose}
              >
                Close & Apply Later
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-white/60 mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            <span className="font-medium">Zane AI Professional Documents</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
          </div>
          <p>💼 Professionally crafted • 🎯 ATS-optimized • 🔄 Tailored for each application</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualApplicationModal;
