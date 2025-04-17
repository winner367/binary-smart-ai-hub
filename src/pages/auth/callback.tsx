
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processDerivToken } from '@/services/deriv-auth';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    const handleCallback = () => {
      try {
        // Extract the token from the URL hash or search params
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (!token) {
          throw new Error('No token found in the callback URL');
        }
        
        // Process the token
        processDerivToken(token);
        setStatus('success');
        
        toast({
          title: 'Login Successful',
          description: 'You have successfully connected with Deriv',
        });
        
        // Redirect to trading page after a short delay
        setTimeout(() => {
          navigate('/trading');
        }, 1500);
        
      } catch (error) {
        console.error('Authentication error:', error);
        setStatus('error');
        
        toast({
          title: 'Authentication Failed',
          description: 'Could not authenticate with Deriv',
          variant: 'destructive',
        });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 rounded-lg shadow-md bg-card max-w-md w-full">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Processing Authentication</h2>
            <p className="text-muted-foreground">Please wait while we verify your Deriv account...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Authentication Successful</h2>
            <p className="text-muted-foreground">You have successfully connected with Deriv.</p>
            <p className="text-muted-foreground mt-2">Redirecting to your trading dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="rounded-full bg-red-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-muted-foreground">Could not authenticate with Deriv.</p>
            <p className="text-muted-foreground mt-2">Redirecting back to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}
