import { useEffect, useState } from 'react';
import { initSession } from './initSession';

export const useAuthInit = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        const { user: sessionUser, error: sessionError } = await initSession();
        
        if (sessionUser) {
          console.log('User authenticated:', sessionUser);
          setUser(sessionUser);
          
        } else if (sessionError) {
          console.error('Authentication failed:', sessionError);
          setError(sessionError);
        } else {
          console.log('No user session found');
        }
      } catch (err) {
        console.error('Error during auth initialization:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { user, loading, error };
}; 