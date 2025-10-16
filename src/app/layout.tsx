import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryClientProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Archive",
  description: "Share interview questions with ease",
  openGraph: {
    title: 'Interview Archive',
    description: 'Share interview questions with ease',
    url: 'https://interview-archive.vercel.app',
    siteName: 'Interview Archive',
    images: [{ url: 'https://interview-archive.vercel.app/og.png' }]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="echo-theme"
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
