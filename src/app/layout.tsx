import Header from "@/components/Navbar/Header";
import "./globals.css";
import mergeClasses from "@/utils";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Modal from "@/components/Modals/Modal";
import LoginModal from "@/components/Modals/LoginModal";
import client from "@/libs/prismadb";
import RtkProvider from "@/providers/RtkProvider";
import RegisterModal from "@/components/Modals/RegisterModal";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "OptimizeX",
  description: "Generate Optimized Images",
};

// Anti-aliazing - Improving the edges of the font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={mergeClasses(
        "dark bg-white font-sans text-zinc-900 antialiased",
        font.variable
      )}
    >
      <body
        className="min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-50"
        suppressHydrationWarning={true}
      >
        <RtkProvider>
          <Header />
          <LoginModal />
          <RegisterModal />
          {children}
          <Footer />
        </RtkProvider>
      </body>
    </html>
  );
}
