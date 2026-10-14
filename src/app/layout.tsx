import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SkipLink from "@/components/SkipLink";
import LocaleProvider from "@/i18n/LocaleProvider";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://achraf-sghiri.vercel.app";

const defaultMessages = getMessages(DEFAULT_LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultMessages.metadata.homeTitle,
    template: "%s | Achraf Sghiri",
  },
  description: defaultMessages.metadata.homeDescription,
  keywords: [
    "cybersecurity",
    "network security",
    "network infrastructure",
    "IPsec",
    "IKEv2",
    "IDS",
    "log monitoring",
    "ICS risk assessment",
    "full-stack development",
    "cybersécurité",
    "infrastructure réseau",
    "portfolio",
  ],
  authors: [{ name: "Achraf Sghiri" }],
  creator: "Achraf Sghiri",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: SITE_URL,
    siteName: defaultMessages.metadata.siteName,
    title: defaultMessages.metadata.homeTitle,
    description: defaultMessages.metadata.homeDescription,
  },
  verification: {
    google: "s4RvUtyajhsgdCVqxuw48PiUY755vVnUsIVEYpDKPC0",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080f",
  colorScheme: "dark",
};

/**
 * Runs before the rest of the document is parsed (and therefore before the
 * first paint) to apply a stored French preference. The `locale-pending` class
 * only gates rendering when the visitor's stored locale differs from the
 * server-rendered default, and is removed by LocaleProvider. When JavaScript is
 * disabled this never executes, so the English default always renders.
 *
 * It also marks the document as JavaScript-enhanced, which is what enables the
 * scroll-reveal styles, with a fallback that releases them if the application
 * never reports a successful hydration.
 */
const localeBootstrap = `(function(){try{var m=document.cookie.match(/(?:^|; )site-locale=([^;]*)/);var v=m?decodeURIComponent(m[1]):null;if(v!=="en"&&v!=="fr"){try{v=window.localStorage.getItem("site-locale")}catch(e){v=null}}var r=document.documentElement;if(v==="fr"){r.lang="fr";r.classList.add("locale-pending");setTimeout(function(){r.classList.remove("locale-pending")},3000)}r.setAttribute("data-locale",v==="fr"?"fr":"en");r.classList.add("js-enhanced");setTimeout(function(){if(!r.hasAttribute("data-hydrated")){r.classList.remove("js-enhanced")}},4000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning is required because the inline script above
    // legitimately mutates <html> (lang, data-locale, class) before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
        <LocaleProvider>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  );
}
