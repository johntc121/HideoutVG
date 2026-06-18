import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.hideoutvg.com"),
  title: {
    default: "HideoutVG - Gaming News, Reviews, and Features",
    template: "%s | HideoutVG",
  },
  description:
    "Gaming news, reviews, opinion pieces, and features covering PlayStation, Xbox, Nintendo, PC, and the biggest stories in games.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "HideoutVG",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
