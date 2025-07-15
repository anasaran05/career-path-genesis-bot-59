import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState('profile');
  const [hasProfile, setHasProfile] = useState(true);

  const checkUserProfile = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (error && error.code === 'PGRST116') { // "No rows found"
      setHasProfile(false);
      setShowOnboarding(true);
      setOnboardingStep('profile');
    } else if (data) {
      setHasProfile(true);
      setShowOnboarding(false);
    }
  }, [user]);

  useEffect(() => {
    checkUserProfile();
  }, [checkUserProfile]);

  const startAnalysis = () => {
    setShowOnboarding(true);
    setOnboardingStep('analysis');
  };

  const nextStep = () => {
    setOnboardingStep(current => {
      if (current === 'analysis') return 'advisory';
      if (current === 'advisory') return 'jobScan';
      return 'jobScan';
    });
  };

  const closeModal = () => {
    setShowOnboarding(false);
  };

  const value = {
    showOnboarding,
    onboardingStep,
    hasProfile,
    startAnalysis,
    nextStep,
    closeModal,
    checkUserProfile,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}; 