import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { ThemeProvider } from "~/components/themeProvider"

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ThemeProvider 
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<div className={GeistSans.className}>
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
};

export default api.withTRPC(MyApp);
