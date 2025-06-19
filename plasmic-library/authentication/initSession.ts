import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const initSession = async (): Promise<{ user: any; error: any }> => {
    try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Session error:', error);
            return { user: null, error };
        }

        if (data.session?.user) {
            console.log('Session initialized:', data.session.user);
            return { user: data.session.user, error: null };
        }

        // Check for OAuth tokens in URL (for OAuth callback)
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
            });
            
            if (sessionError) {
                console.error('OAuth session error:', sessionError);
                return { user: null, error: sessionError };
            }
            
            if (sessionData.session?.user) {
                console.log('OAuth session initialized:', sessionData.session.user);
                return { user: sessionData.session.user, error: null };
            }
        }

        return { user: null, error: new Error('No session found') };
    } catch (err) {
        console.error('Unexpected error during session init:', err);
        return { user: null, error: err };
    }
}; 