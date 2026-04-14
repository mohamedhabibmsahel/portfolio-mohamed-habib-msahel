import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Habib Msahel — HabibOS v3.0 | Full-Stack & Mobile Developer",
  description:
    "Interactive hacker terminal portfolio. Full-stack & mobile developer specializing in React, Node.js, Flutter. Tunisia 🇹🇳 | Available for opportunities.",
  keywords: [
    "Mohamed Habib Msahel", "developer", "portfolio", "full-stack", "mobile",
    "React", "Node.js", "Flutter", "Tunisia", "hacker terminal",
  ],
  authors: [{ name: "Mohamed Habib Msahel" }],
  openGraph: {
    title: "HabibOS v3.0 — Hacker Terminal Portfolio",
    description: "Enter the system. Discover the developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#020b02" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800;1,100..800&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
