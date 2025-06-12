import type { AppProps } from 'next/app';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import '@/styles/globals.css';
import "@/styles/fonts.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;