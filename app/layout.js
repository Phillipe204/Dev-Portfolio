import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.css";
import "./css/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Felipe Mota | Full-Stack Developer & Technical Learner",
  description:
    "Portfolio of Felipe Mota — an aspiring full-stack developer building strong skills in web development, IT, and cybersecurity. Focused on growth, real projects, and long-term excellence in tech.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} text-white antialiased`}>
        <ToastContainer
          theme="dark"
          position="bottom-right"
          toastClassName="!bg-white/5 !backdrop-blur-xl !border !border-white/10 !text-white !rounded-xl"
        />
        <Navbar />
        <main className="relative">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GTM && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      )}
    </html>
  );
}
