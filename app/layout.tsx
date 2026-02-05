import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Starfield from "./components/Starfield";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "LNC Community",
  description: "A community of developers building open source projects.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} antialiased bg-transparent text-foreground overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Starfield />
          <LoadingScreen />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
