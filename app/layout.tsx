import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Bogar Sun Management",
  description: "Premium Solar Management System",
  manifest: "/manifest.webmanifest",
  themeColor: "#09090B",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      suppressHydrationWarning
      className={geist.variable}
    >
      <body className="bg-[#09090B] text-white antialiased overflow-x-hidden">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}