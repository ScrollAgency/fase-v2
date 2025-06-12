import type { AppProps } from "next/app";
import Head from 'next/head';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@/styles/globals.css";
import "@/styles/fonts.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" 
				/>
			</Head>
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;
