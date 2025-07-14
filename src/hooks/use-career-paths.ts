import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CareerPath {
  id: string;
  industry: string;
  role_title: string;
  role_level: string;
  required_skills: string[];
  recommended_skills: string[];
  min_salary: number;
  max_salary: number;
  growth_rate: number;
  job_outlook: string;
  education_requirements: string[];
  experience_years: number;
  matchScore: number;
  salaryRange: string;
  growthIndicator: string;
}

interface CareerPathsResponse {
  careerPaths: CareerPath[];
  totalPaths: number;
  topMatch: CareerPath;
}

export function useCareerPaths(selectedIndustry: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CareerPathsResponse | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCareerPaths = async () => {
      if (!selectedIndustry || !user) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data: response, error: fetchError } = await supabase.functions.invoke(
          'fetch-career-paths',
          {
            body: {
              industry: selectedIndustry,
              userId: user.id,
            },
          }
        );

        if (fetchError) throw fetchError;

        setData(response);
      } catch (err: any) {
        console.error('Error fetching career paths:', err);
        setError(err.message || 'Failed to fetch career paths');
        toast({
          title: 'Error',
          description: 'Failed to fetch career paths. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerPaths();
  }, [selectedIndustry, user, toast]);

  const refetch = () => {
    setData(null);
    setError(null);
    setIsLoading(true);
  };

  return {
    isLoading,
    error,
    data,
    refetch,
  };
} 