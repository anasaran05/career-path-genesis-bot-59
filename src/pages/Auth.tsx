
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Brain, User, Building2, GraduationCap, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'student' | 'recruiter'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          navigate('/');
        }
      } else {
        const userData = {
          full_name: formData.fullName,
          user_type: userType,
          ...(userType === 'recruiter' && { company_name: formData.companyName })
        };
        
        const { error } = await signUp(formData.email, formData.password, userData);
        if (!error) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-navy-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Zane AI'}
            </h1>
            <p className="text-slate-600">
              {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
            </p>
          </div>

          <Card className="bg-white border border-slate-200 shadow-xl rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-navy-800 text-xl text-center">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </CardTitle>
              {!isLogin && (
                <CardDescription className="text-center">
                  Choose your portal type
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button
                      type="button"
                      variant={userType === 'student' ? 'default' : 'outline'}
                      className={`h-20 flex-col space-y-2 ${
                        userType === 'student' 
                          ? 'bg-gradient-to-r from-navy-600 to-autumn-500 text-white' 
                          : 'border-2 border-slate-200 text-navy-700 hover:bg-navy-50'
                      }`}
                      onClick={() => setUserType('student')}
                    >
                      <GraduationCap className="w-6 h-6" />
                      <span className="font-medium">Student Portal</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'recruiter' ? 'default' : 'outline'}
                      className={`h-20 flex-col space-y-2 ${
                        userType === 'recruiter' 
                          ? 'bg-gradient-to-r from-navy-600 to-autumn-500 text-white' 
                          : 'border-2 border-slate-200 text-navy-700 hover:bg-navy-50'
                      }`}
                      onClick={() => setUserType('recruiter')}
                    >
                      <Briefcase className="w-6 h-6" />
                      <span className="font-medium">HR / Recruiter Portal</span>
                    </Button>
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-navy-700 font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 rounded-xl"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                {!isLogin && userType === 'recruiter' && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-navy-700 font-medium">Company Name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 rounded-xl"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-navy-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 rounded-xl"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-navy-700 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 rounded-xl"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-navy-600 hover:text-navy-700 font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
