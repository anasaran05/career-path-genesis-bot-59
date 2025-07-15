
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              
              {/* Protected routes */}
              <Route path="/intake" element={
                <ProtectedRoute>
                  <Intake />
                </ProtectedRoute>
              } />
              <Route path="/analysis/:industry" element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              } />
              <Route path="/job-scan" element={
                <ProtectedRoute>
                  <JobScan />
                </ProtectedRoute>
              } />
              <Route path="/job-application/:jobId" element={
                <ProtectedRoute>
                  <JobApplication />
                </ProtectedRoute>
              } />
              <Route path="/job-details/:jobId" element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              } />
              <Route path="/advisory-report" element={
                <ProtectedRoute>
                  <AdvisoryReport />
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/recruiter-dashboard" element={
                <ProtectedRoute>
                  <RecruiterDashboard />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
