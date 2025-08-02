'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useContentManager } from '@/hooks/useContentManager';
import { motion } from 'framer-motion';
import SharedHeader from '@/components/header/SharedHeader';
import { Footer } from '@/components/footer';
import Contact from '@/components/pages/contact';
import HowItWorks from '@/components/pages/how-it-works';
import { Dialog } from '@/components/ui/dialog';
import Home from '@/components/home/lenis-home';
import LiquidGlassModal from '@/components/home/about-modal';
import { useRouter } from 'next/navigation';

interface PageData {
  slug: string;
  title: string;
  html: string;
}

export default function DynamicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { sitePages, isLoading } = useContentManager();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();

  const handleCloseModal = () => {
  router.push('/'); // instead of window.history.pushState
  };

  useEffect(() => {
    if (!isLoading && sitePages) {
      // Find the page with matching slug
      const page = sitePages.find(pageString => {
        const [pageSlug] = pageString.split('|');
        return pageSlug === slug;
      });

      if (page) {
        const [pageSlug, title, html] = page.split('|');
        setPageData({
          slug: pageSlug,
          title: title || 'Untitled Page',
          html: html || '<p>No content available</p>'
        });
      } else {
        setNotFound(true);
      }
    }
  }, [slug, sitePages, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }



  // Check for custom page components first
  if (slug === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <SharedHeader isTransparent={false} />
        <main className="pt-26">
          <Contact />
        </main>
        <Footer />
      </div>
    );
  }

  if (slug === 'about') {
    return (
      <>
      <div className="max-h-screen overflow-hidden relative">
        <Home />
      </div>
      <LiquidGlassModal
        onClose={handleCloseModal}
        title=""
      >
        <p className="text-gray-700 text-2xl">We’re a community-driven platform for creative professionals to connect, stay
organized, and bring projects to life.
Whether you're in fashion, film, or seeking creative services, our tools make it easy
to manage your work in one place — with chat, invoicing, payments, stats, and
more.
Built for collaboration, discovery, and creativity — this is your space to connect,
create, and grow.</p>
      </LiquidGlassModal>
    </>
    )
  }

  if (slug === 'how-it-works') {
    return (
      <div className="min-h-screen bg-white">
        <SharedHeader isTransparent={false} />
        <main className="pt-26">
          <HowItWorks />
        </main>
        <Footer />
      </div>
    );
  }

  if (!pageData) {
    return null;
  }

  else if (notFound)  {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <SharedHeader isTransparent={true} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Consistent Header */}
      <SharedHeader isTransparent={true} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-16 py-12 pt-[6%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div
            dangerouslySetInnerHTML={{ __html: pageData.html }}
            className="dynamic-content"
          />
        </motion.div>
      </main>

      {/* Consistent Footer */}
      <Footer />

      <style jsx global>{`
        .dynamic-content {
          line-height: 1.7;
        }
        
        .dynamic-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #111;
        }
        
        .dynamic-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111;
        }
        
        .dynamic-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111;
        }
        
        .dynamic-content p {
          margin-bottom: 1.25rem;
          color: #374151;
        }
        
        .dynamic-content ul, .dynamic-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        
        .dynamic-content li {
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .dynamic-content a {
          color: #000;
          text-decoration: underline;
        }
        
        .dynamic-content a:hover {
          color: #374151;
        }
        
        .dynamic-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        
        .dynamic-content blockquote {
          border-left: 4px solid #000;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6B7280;
        }
        
        .dynamic-content code {
          background-color: #F3F4F6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }
        
        .dynamic-content pre {
          background-color: #F3F4F6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .dynamic-content pre code {
          background: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
} 