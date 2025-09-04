import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { UserProvider } from "@/lib/contexts/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { config } from "@/config";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: config.seo.defaultTitle,
  description: config.seo.defaultDescription,
  authors: [{ name: config.app.author }],
  keywords: ["Next.js", "React", "TypeScript", "Dekamond"],
  openGraph: {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    images: [config.seo.defaultImage],
    type: "website",
    url: config.app.url,
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    images: [config.seo.defaultImage],
    creator: config.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  // Performance optimizations
  other: {
    "X-DNS-Prefetch-Control": "on",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="//randomuser.me" />
        <link rel="preconnect" href="https://randomuser.me" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <UserProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
