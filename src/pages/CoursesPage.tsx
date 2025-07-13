import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Star, Clock, Users, ExternalLink, BookOpen, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'clinical-research', name: 'Clinical Research' },
    { id: 'nursing', name: 'Nursing' },
    { id: 'pharmacy', name: 'Pharmacy' },
    { id: 'healthcare-management', name: 'Healthcare Management' },
    { id: 'medical-technology', name: 'Medical Technology' }
  ];

  const courses = [
    // ZaneProEd Priority Courses
    {
      id: 1,
      title: "Pro Training in Clinical Research",
      provider: "ZaneProEd",
      category: "clinical-research",
      type: "Live + Self-paced",
      duration: "12 weeks",
      students: "2,500+",
      rating: 4.9,
      price: "₹25,000",
      description: "Comprehensive clinical research training with real-world projects and industry mentorship.",
      isPriority: true,
      features: ["ICH-GCP Certification", "Real Clinical Trials", "Job Placement Support", "Industry Projects"]
    },
    {
      id: 2,
      title: "Hospital & ICU Clinical Pharmacy",
      provider: "ZaneProEd",
      category: "pharmacy",
      type: "Live + Practical",
      duration: "10 weeks",
      students: "1,800+",
      rating: 4.8,
      price: "₹22,000",
      description: "Specialized training for hospital pharmacy practice with ICU focus.",
      isPriority: true,
      features: ["Hospital Attachments", "ICU Case Studies", "Clinical Protocols", "Certification"]
    },
    {
      id: 3,
      title: "Pharmacovigilance & Drug Safety",
      provider: "ZaneProEd",
      category: "pharmacy",
      type: "Self-paced + Live",
      duration: "8 weeks",
      students: "3,200+",
      rating: 4.9,
      price: "₹18,000",
      description: "Complete pharmacovigilance training with regulatory focus and industry tools.",
      isPriority: true,
      features: ["PvPI Training", "ADR Reporting", "Regulatory Knowledge", "Industry Software"]
    },
    {
      id: 4,
      title: "Healthcare Leadership & Management",
      provider: "ZaneProEd",
      category: "healthcare-management",
      type: "Live Sessions",
      duration: "6 weeks",
      students: "950+",
      rating: 4.7,
      price: "₹15,000",
      description: "Leadership skills for healthcare professionals aiming for management roles.",
      isPriority: true,
      features: ["Leadership Training", "Healthcare Economics", "Team Management", "Strategic Planning"]
    },
    // External Market Courses
    {
      id: 5,
      title: "GCP for Beginners",
      provider: "Coursera",
      category: "clinical-research",
      type: "Self-paced",
      duration: "4 weeks",
      students: "12,000+",
      rating: 4.5,
      price: "₹2,999",
      description: "Introduction to Good Clinical Practice principles and regulations.",
      isPriority: false,
      features: ["Certificate", "Flexible Schedule", "Expert Videos", "Quizzes"]
    },
    {
      id: 6,
      title: "Pharmacovigilance 101",
      provider: "Udemy",
      category: "pharmacy",
      type: "Self-paced",
      duration: "6 weeks",
      students: "8,500+",
      rating: 4.3,
      price: "₹1,299",
      description: "Basic pharmacovigilance concepts and practices for beginners.",
      isPriority: false,
      features: ["Lifetime Access", "Mobile App", "Certificate", "Practical Examples"]
    },
    {
      id: 7,
      title: "Advanced Nursing Practice",
      provider: "edX",
      category: "nursing",
      type: "University Course",
      duration: "16 weeks",
      students: "5,600+",
      rating: 4.6,
      price: "₹8,999",
      description: "Advanced nursing concepts and specialized care techniques.",
      isPriority: false,
      features: ["University Credit", "Clinical Hours", "Expert Faculty", "Peer Discussion"]
    },
    {
      id: 8,
      title: "Medical Device Technology",
      provider: "Coursera",
      category: "medical-technology",
      type: "Specialization",
      duration: "12 weeks",
      students: "7,200+",
      rating: 4.4,
      price: "₹4,999",
      description: "Understanding medical devices, regulations, and quality systems.",
      isPriority: false,
      features: ["Hands-on Projects", "Industry Partners", "Certificate", "Career Support"]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const priorityCourses = filteredCourses.filter(course => course.isPriority);
  const otherCourses = filteredCourses.filter(course => !course.isPriority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/advisory-report" className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Advisory Report</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-navy-800 font-bold text-xl">Learning Paths</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Explore Learning Opportunities
            </div>
            
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              Advance Your Healthcare Career
            </h1>
            <p className="text-xl text-navy-600 mb-8 max-w-2xl mx-auto">
              Discover top courses from ZaneProEd and leading platforms to upskill in your healthcare domain
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search courses, providers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg border-2 border-slate-200 focus:border-navy-400 rounded-xl"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-navy-600 hover:bg-navy-700 text-white" 
                    : "border-2 border-slate-200 text-navy-700 hover:bg-navy-50"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* ZaneProEd Priority Courses */}
          {priorityCourses.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-autumn-600 mr-3" />
                <h2 className="text-2xl font-bold text-navy-900">Featured ZaneProEd Courses</h2>
                <Badge className="ml-3 bg-autumn-100 text-autumn-700">Recommended</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {priorityCourses.map((course) => (
                  <Card key={course.id} className="bg-white shadow-xl border-2 border-autumn-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-autumn-500 text-white">ZaneProEd</Badge>
                        <div className="flex items-center text-sm text-amber-600">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          {course.rating}
                        </div>
                      </div>
                      <CardTitle className="text-navy-900 text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-slate-600">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {course.type}
                          </Badge>
                          <span className="text-lg font-bold text-navy-800">{course.price}</span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-700">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-navy-300 text-navy-600">
                                {feature}
                              </Badge>
                            ))}
                            {course.features.length > 2 && (
                              <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                                +{course.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-autumn-500 to-autumn-600 hover:from-autumn-600 hover:to-autumn-700 text-white">
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other Market Courses */}
          {otherCourses.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <ExternalLink className="w-6 h-6 text-navy-600 mr-3" />
                <h2 className="text-2xl font-bold text-navy-900">More Learning Options</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCourses.map((course) => (
                  <Card key={course.id} className="bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="border-slate-300 text-slate-600">
                          {course.provider}
                        </Badge>
                        <div className="flex items-center text-sm text-amber-600">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          {course.rating}
                        </div>
                      </div>
                      <CardTitle className="text-navy-900 text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-slate-600">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                            {course.type}
                          </Badge>
                          <span className="text-lg font-bold text-navy-800">{course.price}</span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-700">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-slate-300 text-slate-600">
                                {feature}
                              </Badge>
                            ))}
                            {course.features.length > 2 && (
                              <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                                +{course.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button variant="outline" className="w-full border-2 border-navy-200 text-navy-700 hover:bg-navy-50">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
