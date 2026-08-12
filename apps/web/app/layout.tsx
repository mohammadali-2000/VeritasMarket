export const runtime = "edge";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { DemoTermsGate } from "./components/DemoTermsGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeritasMarket — Cryptographic Belief Settlement Protocol",
  description:
    "Stake on immutable claims. Cryptographic commit-reveal voting, SpaceComputer VRF jury selection, and automated stake slashing for dishonest jurors.",
  openGraph: {
    title: "VeritasMarket — Cryptographic Belief Settlement Protocol",
    description:
      "Decentralized prediction markets with cryptographic commit-reveal and random VRF jury resolution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeritasMarket — Cryptographic Belief Settlement Protocol",
    description:
      "Immutable claims, private commit-reveal voting, VRF jury selection, and 20% stake slashing.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0c14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <div className="site-bg" aria-hidden="true">
          <div className="site-bg-orb site-bg-orb-1" />
          <div className="site-bg-orb site-bg-orb-2" />
          <div className="site-bg-grid" />
        </div>
        <Providers>
          <SiteHeader />
          <div className="site-main">{children}</div>
          <SiteFooter />
          <DemoTermsGate />
        </Providers>
      </body>
    </html>
  );
}
