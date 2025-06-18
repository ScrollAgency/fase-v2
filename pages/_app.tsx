import type { AppProps } from 'next/app';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import '@/styles/globals.css';
import "@/styles/fonts.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useAuthInit } from '@/plasmic-library/authentication/useAuthInit';

function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuthInit();

  // This will run on every page load and automatically initialize the session
  console.log('Auth state:', { user, loading });

  return <Component {...pageProps} />;
}

export default MyApp;