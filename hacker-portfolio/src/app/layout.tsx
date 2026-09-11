import type { Metadata } from "next";
import "./globals.css";

// Required for relative image paths below to resolve to absolute URLs.
// Without it Next falls back to http://localhost:3000 and every social
// preview (LinkedIn, WhatsApp, Slack) renders with a broken image.
export const metadata: Metadata = {
  metadataBase: new URL("https://mohamedhabibmsahel.github.io"),
  title: "Mohamed Habib Msahel — Mobile Engineer | Flutter & Node.js",
  description:
    "Mobile engineer specializing in Flutter & Dart. Production iOS/Android apps backed by Node.js APIs. Tunis, Tunisia 🇹🇳 | Available for opportunities.",
  keywords: [
    "Mohamed Habib Msahel", "Flutter developer", "mobile engineer", "Dart",
    "Node.js", "React", "Next.js", "cross-platform", "Tunisia", "portfolio",
  ],
  authors: [{ name: "Mohamed Habib Msahel" }],
  openGraph: {
    title: "Mohamed Habib Msahel — Mobile Engineer | Flutter & Node.js",
    description:
      "Mobile engineer specializing in Flutter & Dart. Production iOS/Android apps backed by Node.js APIs. Based in Tunis, Tunisia — open to opportunities.",
    url: "https://mohamedhabibmsahel.github.io/portfolio-mohamed-habib-msahel/",
    siteName: "HabibOS",
    images: [
      {
        // 1200x627 landscape — the ratio LinkedIn/Twitter render as a large card.
        // A square image is downscaled into a small thumbnail instead.
        url: "/portfolio-mohamed-habib-msahel/assets/og-card.png",
        width: 1200,
        height: 627,
        alt: "Mohamed Habib Msahel — Mobile Engineer | Flutter & Dart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Habib Msahel — Mobile Engineer | Flutter & Node.js",
    description:
      "Mobile engineer specializing in Flutter & Dart. Production iOS/Android apps backed by Node.js APIs.",
    images: ["/portfolio-mohamed-habib-msahel/assets/og-card.png"],
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
