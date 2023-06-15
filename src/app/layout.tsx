import "./globals.css";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/Navbar/Header";
import Footer from "@/components/Footer/Footer";
import LoginModal from "@/components/Modals/LoginModal";
import RtkProvider from "@/providers/RtkProvider";
import CookieBanner from "@/components/Analytics/CookieBanner";
import mergeClasses from "@/utils/mergeClasses";
import RegisterModal from "@/components/Modals/RegisterModal";
import getCurrentUser from "@/actions/getCurrentUser";
import ToasterProvider from "@/providers/ToasterProvider";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OptimizeX",
  description:
    "Effortlessly bulk-generate optimized versions of your images with our free and open-source tool.",
  openGraph: {
    title: "OptimizeX",
    description:
      "Effortlessly bulk-generate optimized versions of your images with our free and open-source tool.",
    images:
      "https://media-bucket-project.s3.ap-south-1.amazonaws.com/og-render.png",
    url: "https://optimizex.vercel.app/",
    type: "website",
    siteName: "OptimizeX",
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
        className={`min-h-screen font-sans antialiased bg-zinc-950 text-zinc-50`}
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
