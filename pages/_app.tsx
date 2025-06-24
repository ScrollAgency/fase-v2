import type { AppProps } from "next/app";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@/styles/globals.css";
import "@/styles/fonts.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	PlasmicRootProvider,
	PlasmicComponent,
} from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "../plasmic-init"; 

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const ROUTES_WITH_LOADER = ["/news/[slug]","/events/[slug]","/collections/[id]"];

  useEffect(() => {
  const matchRoute = (url: string) => {
    // Gère les routes dynamiques comme /events/[slug]
    return ROUTES_WITH_LOADER.some((routePattern) => {
    const routeRegex = new RegExp("^" + routePattern.replace(/\[.*?\]/g, "[^/]+").replace(/\/$/, "") + "/?$");

      return routeRegex.test(url.split("?")[0]);
    });
  };

  const handleStart = (url: string) => {
    if (matchRoute(url)) {
      setShouldShowLoader(true);
      setLoading(true);
    }
  };

  const handleStop = () => {
    setLoading(false);
    setTimeout(() => setShouldShowLoader(false), 500);
  };

  router.events.on("routeChangeStart", handleStart);
  router.events.on("routeChangeComplete", handleStop);
  router.events.on("routeChangeError", handleStop);

  return () => {
    router.events.off("routeChangeStart", handleStart);
    router.events.off("routeChangeComplete", handleStop);
    router.events.off("routeChangeError", handleStop);
  };
}, []);

	return (
		<PlasmicRootProvider loader={PLASMIC}>
			{/* Loader Plasmic */}
			{shouldShowLoader && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "white",
						zIndex: 9999,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						opacity: loading ? 1 : 0,
						transition: "opacity 0.5s ease-in-out",
						pointerEvents: loading ? "auto" : "none",
					}}
				>
					<PlasmicComponent component="PageLoaderCustom" />
				</div>
			)}

			{/* Contenu principal */}
			<Component {...pageProps} />
		</PlasmicRootProvider>
	);
}

export default MyApp;
