'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useContentManager } from '@/hooks/useContentManager';
import { motion } from 'framer-motion';
import SharedHeader from '@/components/header/SharedHeader';
import { Footer } from '@/components/footer';

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

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <SharedHeader isTransparent={false} />
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

  if (!pageData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Consistent Header */}
      <SharedHeader isTransparent={false} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
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