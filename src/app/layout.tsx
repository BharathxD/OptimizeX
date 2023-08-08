import "./globals.css";

import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import getCurrentUser from "@/actions/getCurrentUser";
import { siteConfiguration } from "@/config";
import mergeClasses from "@/utils/mergeClasses";

import RtkProvider from "@/providers/RtkProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import CookieBanner from "@/components/Analytics/CookieBanner";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import Footer from "@/components/Footer/Footer";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
import Header from "@/components/Navbar/Header";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: siteConfiguration.title,
  description: siteConfiguration.description,
  openGraph: {
    title: siteConfiguration.title,
    description: siteConfiguration.openGraph.description,
    images: siteConfiguration.openGraph.description,
    url: siteConfiguration.openGraph.url,
    type: siteConfiguration.openGraph.type,
    siteName: siteConfiguration.openGraph.siteName,
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
    minimumScale: 1.0,
  },
};

// Anti-aliazing - Improving the edges of the font
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html
      lang="en"
      className={mergeClasses(
        "dark bg-white font-sans text-zinc-900 antialiased",
        font.variable
      )}
    >
      <GoogleAnalytics
        GA_MEASUREMENT_ID={process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!}
      />
      <body
        className={`min-h-screen bg-zinc-950 font-sans text-zinc-50 antialiased`}
        suppressHydrationWarning={true}
      >
        <CookieBanner />
        <ToasterProvider />
        <RtkProvider>
          <Header currentUser={currentUser} />
          <LoginModal />
          <RegisterModal />
          <main>{children}</main>
          <Footer />
        </RtkProvider>
      </body>
    </html>
  );
}
