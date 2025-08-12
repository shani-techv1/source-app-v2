import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Type for content items from API
interface ContentItem {
  id: string;
  title: string;
  type: string;
  value: string | string[];
}

interface ApiResponse {
  general?: ContentItem[];
}
export const dynamic = 'force-dynamic';


async function getFontSettings() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/fonts`, {
      cache: 'no-store' // Ensure fresh data
    });
    const data = await response.json();

    const fontFamily = Array.isArray(data?.fonts) ? data?.fonts[0] : data?.fonts;

    const fontUrl = fontFamily
      ? `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`
      : '';

    return { fontUrl, fontFamily };
  } catch (error) {
    console.error('Error fetching font settings:', error);
    return { fontUrl: '', fontFamily: 'Inter Tight' };
  }
}
// Dynamic metadata function that reads from the content API
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Try to fetch metadata from our content API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/content`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (response.ok) {
      const data: ApiResponse = await response.json();
      const siteTitle = data.general?.find((item: ContentItem) => item.id === 'site-title')?.value || 'Sourced - Creative Network';
      const metaDescription = data.general?.find((item: ContentItem) => item.id === 'meta-description')?.value || 'Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.';
      const siteFavicon = data.general?.find((item: ContentItem) => item.id === 'site-favicon')?.value || '/favicon.ico';

      // Ensure values are strings
      const titleStr = Array.isArray(siteTitle) ? siteTitle.join(' ') : siteTitle;
      const descStr = Array.isArray(metaDescription) ? metaDescription.join(' ') : metaDescription;
      const faviconStr = Array.isArray(siteFavicon) ? siteFavicon[0] : siteFavicon;

      return {
        title: titleStr,
        description: descStr,
        keywords: 'creative network, photographers, videographers, models, talent booking, creative professionals',
        authors: [{ name: 'Sourced' }],
        icons: {
          icon: faviconStr,
          shortcut: faviconStr,
          apple: faviconStr,
        },
        openGraph: {
          title: titleStr,
          description: descStr,
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: titleStr,
          description: descStr,
        }
      };
    }
  } catch (error) {
    console.error('Error loading dynamic metadata:', error);
  }

  // Fallback metadata if API fails
  return {
    title: "Sourced - Creative Network",
    description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
    keywords: 'creative network, photographers, videographers, models, talent booking, creative professionals',
    authors: [{ name: 'Sourced' }],
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    openGraph: {
      title: "Sourced - Creative Network",
      description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Sourced - Creative Network",
      description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fontUrl, fontFamily } = await getFontSettings();
  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="https://use.typekit.net/bvm3wii.css" /> */}
        {fontUrl && <link rel="stylesheet" href={fontUrl} />}
        <style>{`:root { --font-family: ${fontFamily ? `"${fontFamily}", sans-serif` : 'system-ui, sans-serif'}; }`}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
