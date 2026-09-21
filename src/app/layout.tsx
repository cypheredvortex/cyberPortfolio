import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Achraf Sghiri — Cybersecurity & Network Infrastructure",
    template: "%s | Achraf Sghiri",
  },
  description:
    "Portfolio of Achraf Sghiri, a Computer Science and Networks engineering candidate specializing in cybersecurity and network infrastructure.",
  keywords: [
    "cybersecurity",
    "network security",
    "IPsec",
    "IDS",
    "log monitoring",
    "full-stack development",
    "portfolio",
  ],
  authors: [{ name: "Achraf Sghiri" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Achraf Sghiri — Portfolio",
    title: "Achraf Sghiri — Cybersecurity & Network Infrastructure",
    description:
      "Computer Science and Networks engineering candidate specializing in cybersecurity and network infrastructure.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
