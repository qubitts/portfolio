import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piyush Mittal",
  description:
    "Software Engineer specializing in backend systems, AI infrastructure, and platform development. Interactive terminal portfolio.",
  keywords: [
    "Piyush Mittal",
    "Software Engineer",
    "Backend Engineer",
    "Portfolio",
    "AI",
    "LLM",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Piyush Mittal" }],
  openGraph: {
    title: "Piyush Mittal",
    description:
      "Backend & AI Engineer — Interactive terminal portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
