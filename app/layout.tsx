import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdulhannan.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdul Hannan — Full-Stack & AI Automation Engineer",
    template: "%s | Abdul Hannan",
  },
  description:
    "Abdul Hannan is a Lahore-based software engineer building high-performance web products, AI automation, and LLM-powered systems.",
  keywords: ["Full-stack engineer", "Next.js developer", "AI automation", "React", "Node.js", "LLM systems"],
  authors: [{ name: "Abdul Hannan" }],
  creator: "Abdul Hannan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Abdul Hannan — Full-Stack & AI Automation Engineer",
    description: "Building useful, thoughtful systems at the intersection of web engineering and AI.",
    siteName: "Abdul Hannan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Hannan — Full-Stack & AI Automation Engineer",
    description: "Web products, AI automation, and LLM-powered systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
