
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import OnboardingModal from "@/components/OnboardingModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Intake from "./pages/Intake";
import Analysis from "./pages/Analysis";
import JobScan from "./pages/JobScan";
import JobApplication from "./pages/JobApplication";
import JobDetails from "./pages/JobDetails";
import AdvisoryReport from "./pages/AdvisoryReport";
import CoursesPage from "./pages/CoursesPage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <OnboardingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <OnboardingModal />
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/intake" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Intake />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/analysis/:industry" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Analysis />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/job-scan" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <JobScan />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/job-application/:jobId" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <JobApplication />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/job-details/:jobId" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <JobDetails />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/advisory-report" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <AdvisoryReport />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/courses" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CoursesPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/recruiter-dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <RecruiterDashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
