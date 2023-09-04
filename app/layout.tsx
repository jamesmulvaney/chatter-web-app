import "../styles/globals.css";
import Navbar from "./Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

//Inter Font
const inter = Inter({ subsets: ["latin"] });

//Head Metadata
export const metadata: Metadata = {
  title: "Chatter",
  description: "A modern chat application built for the web.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Chatter",
    description: "A modern chat application built for the web.",
    url: process.env.BASE_URL,
    siteName: "Chatter",
    locale: "en-us",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className + " text-black dark:text-white"}>
      <head />
      <body className="dark:bg-gray-900">
        {/* @ts-expect-error Async Server Component */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
