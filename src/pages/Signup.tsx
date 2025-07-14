import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-navy-800">Create Your Account</h1>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'github']}
                view="sign_up"
                redirectTo={`${window.location.origin}/dashboard`}
            />
        </div>
    </div>
  );
};

export default Signup; 