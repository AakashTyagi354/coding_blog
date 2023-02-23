import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class" >
      <SessionProvider session={pageProps.session} baseUrl="https://newblog-ek8f1b68m-aakashtyagi354.vercel.app/">
        <Component {...pageProps} />
      </SessionProvider>
      {/* <Component {...pageProps} /> */}
    </ThemeProvider>
  );
}

export default MyApp;
