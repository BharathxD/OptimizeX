import Header from "@/components/Navbar/Header";
import "./globals.css";
import mergeClasses from "@/utils/mergeClasses";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import LoginModal from "@/components/Modals/LoginModal";
import RtkProvider from "@/providers/RtkProvider";
import RegisterModal from "@/components/Modals/RegisterModal";
import getCurrentUser from "@/actions/getCurrentUser";
import { Toaster } from "react-hot-toast";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "OptimizeX",
  description: "Generate Optimized Images",
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
      <body
        className="min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-50"
        suppressHydrationWarning={true}
      >
        <ToasterProvider />
        <RtkProvider>
          <Header currentUser={currentUser} />
          <LoginModal />
          <RegisterModal />
          <main className="overflow-hidden">{children}</main>
          <Footer />
        </RtkProvider>
      </body>
    </html>
  );
}
