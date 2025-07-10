'use client';

import { useState, useEffect } from 'react';

// Types for content management
interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'image' | 'array';
  value: string | string[];
  placeholder?: string;
  maxLength?: number;
}

interface ContentData {
  hero: ContentSection[];
  navigation: ContentSection[];
  footer: ContentSection[];
  general: ContentSection[];
  whySourced: ContentSection[];
  pages: ContentSection[];
  footerLinks: ContentSection[];
}

// Default content structure
const defaultContent: ContentData = {
  hero: [
    {
      id: 'hero-title',
      title: 'Hero Title',
      type: 'text',
      value: 'Manage. Book. Create.',
      placeholder: 'Enter hero title'
    },
    {
      id: 'hero-subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      value: 'Sourced simplifies creative connections',
      placeholder: 'Enter hero subtitle'
    },
    {
      id: 'hero-image',
      title: 'Hero Background Image',
      type: 'image',
      value: '/image.png',
      placeholder: 'Upload hero image'
    },
    {
      id: 'morphing-texts',
      title: 'Morphing Text Options',
      type: 'array',
      value: [
        'MODEL', 'INFLUENCER', 'ACTOR', 'STYLIST', 'HAIR STYLIST', 
        'MAKEUP ARTIST', 'PHOTOGRAPHER', 'VIDEOGRAPHER', 'ASSISTANT', 'LIGHTING', 
        'DIRECTOR', 'COSTUME DESIGNER', 'PRODUCER', 'SOUND ENGINEER', 'POST PRODUCTION', 
        'WRITER', 'FIT MODEL', 'TALENT AGENT', 'SET DESIGNER', 'GRAPHIC DESIGNER', 
        'VEHICLE OWNER', 'EQUIPTMENT', 'PROPS', 'LOCATION (STUDIOS, HOUSES & OTHER)', 
        'BRAND', 'OTHER'
      ]
    },
    {
      id: 'launching-text',
      title: 'Launching Text',
      type: 'text',
      value: 'Launching Soon.',
      placeholder: 'Enter launching text'
    }
  ],
  navigation: [
    {
      id: 'brand-name',
      title: 'Brand Name',
      type: 'text',
      value: 'SOURCED',
      placeholder: 'Enter brand name'
    },
    {
      id: 'brand-logo',
      title: 'Brand Logo (Square Image)',
      type: 'image',
      value: '',
      placeholder: 'Upload square logo image'
    },
    {
      id: 'how-it-works-items',
      title: 'How It Works Menu Items',
      type: 'array',
      value: ['For Talent|/for-talent', 'For Agents|/for-agents', 'Pricing|/pricing', 'Security|/security']
    },
    {
      id: 'company-items',
      title: 'Company Menu Items',
      type: 'array',
      value: ['About|/about', 'Information|/information', 'Team|/team', 'Careers|/careers']
    }
  ],
  footer: [
    {
      id: 'subscription-title',
      title: 'Subscription Title',
      type: 'text',
      value: 'SUBSCRIBE FOR FIRST ACCESS',
      placeholder: 'Enter subscription title'
    },
    {
      id: 'subscription-subtitle',
      title: 'Subscription Subtitle',
      type: 'text',
      value: 'NO SALES OR SPAM',
      placeholder: 'Enter subscription subtitle'
    },
    {
      id: 'copyright-text',
      title: 'Copyright Text',
      type: 'text',
      value: '© Sourced. 2025 All rights reserved.',
      placeholder: 'Enter copyright text'
    },
    {
      id: 'instagram-icon',
      title: 'Instagram Icon',
      type: 'image',
      value: '/insta.png',
      placeholder: 'Upload Instagram icon'
    },
    {
      id: 'linkedin-icon',
      title: 'LinkedIn Icon',
      type: 'image',
      value: '/linkdin.png',
      placeholder: 'Upload LinkedIn icon'
    }
  ],
  general: [
    {
      id: 'site-title',
      title: 'Site Title',
      type: 'text',
      value: 'Sourced - Creative Network',
      placeholder: 'Enter site title'
    },
    {
      id: 'meta-description',
      title: 'Meta Description',
      type: 'textarea',
      value: 'Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.',
      placeholder: 'Enter meta description',
      maxLength: 160
    },
    {
      id: 'site-favicon',
      title: 'Site Favicon',
      type: 'image',
      value: '/favicon.ico',
      placeholder: 'Upload favicon (16x16 or 32x32 pixels, .ico or .png format)'
    }
  ],
  whySourced: [
    {
      id: 'why-sourced-badge',
      title: 'Section Badge Text',
      type: 'text',
      value: 'WHY SOURCED?',
      placeholder: 'Enter badge text'
    },
    {
      id: 'why-sourced-title',
      title: 'Section Title',
      type: 'text',
      value: 'How We Make Creative Collaborations Simple',
      placeholder: 'Enter section title'
    },
    {
      id: 'accordion-items',
      title: 'Accordion Items',
      type: 'array',
      value: [
        'Find and Shortlist Talent|Discover a curated network of top creative professionals. Browse portfolios, filter by specialization, and easily shortlist the perfect collaborators for your project needs.|Users',
        'Post Your Job in Minutes|Create detailed job postings in just a few clicks. Specify your project requirements, timeline, and budget, then share it with our network of talented professionals.|FileText'
      ]
    }
  ],
  pages: [
    {
      id: 'site-pages',
      title: 'Website Pages',
      type: 'array',
      value: [
        'about|About Us|<h1>About Sourced</h1><p>We are a creative network connecting talent with opportunities.</p>',
        'contact|Contact|<h1>Contact Us</h1><p>Get in touch with our team.</p>',
        'pricing|Pricing|<h1>Pricing</h1><p>Transparent pricing for all our services.</p>',
        'terms|Terms & Conditions|<h1>Terms & Conditions</h1><p>Please read our terms and conditions carefully.</p>',
        'privacy|Privacy Policy|<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>',
        'careers|Careers|<h1>Join Our Team</h1><p>Explore career opportunities at Sourced.</p>'
      ]
    }
  ],
  footerLinks: [
    {
      id: 'footer-columns',
      title: 'Footer Link Columns',
      type: 'array',
      value: [
        'Account|login:Login,join:Join',
        'How It Works|pricing:Pricing,booking:Booking,for-creator:For a Creator,for-agency:For an Agency',
        'Company|about:About,contact:Contact,careers:Careers',
        'Legal|terms:Terms,privacy:Privacy'
      ]
    }
  ]
};

export const useContentManager = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load content from localStorage (in production, this would be an API call)
    const loadContent = () => {
      try {
        const savedContent = localStorage.getItem('site-content');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          // Merge with default content to ensure all sections exist
          const mergedContent = {
            ...defaultContent,
            ...parsedContent
          };
          // Ensure each section has the required structure
          Object.keys(defaultContent).forEach(key => {
            const sectionKey = key as keyof ContentData;
            if (!mergedContent[sectionKey] || !Array.isArray(mergedContent[sectionKey])) {
              mergedContent[sectionKey] = defaultContent[sectionKey];
            }
          });
          setContent(mergedContent);
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to default content
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Helper function to get content by section and ID
  const getContent = (section: keyof ContentData, id: string): string | string[] => {
    const sectionContent = content[section];
    if (!sectionContent || !Array.isArray(sectionContent)) {
      return '';
    }
    const item = sectionContent.find(item => item.id === id);
    return item?.value || '';
  };

  // Helper function to get text content
  const getText = (section: keyof ContentData, id: string): string => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value.join(', ') : value;
  };

  // Helper function to get array content
  const getArray = (section: keyof ContentData, id: string): string[] => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value : [value].filter(Boolean);
  };

  // Helper function to get image URL
  const getImage = (section: keyof ContentData, id: string): string => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value[0] || '' : value;
  };

  // Helper function to get navigation menu items with URLs
  const getNavMenuItems = (section: keyof ContentData, id: string): { label: string; url: string }[] => {
    const items = getArray(section, id);
    return items.map(item => {
      const [label, url] = item.split('|');
      return { 
        label: label || '', 
        url: url || '#' 
      };
    });
  };

  // Helper function to get navigation menu labels only (for backward compatibility)
  const getNavMenuLabels = (section: keyof ContentData, id: string): string[] => {
    const items = getArray(section, id);
    return items.map(item => {
      const [label] = item.split('|');
      return label || '';
    });
  };

  return {
    content,
    isLoading,
    getContent,
    getText,
    getArray,
    getImage,
    getNavMenuItems,
    getNavMenuLabels,
    // Specific content getters for common use cases
    heroTitle: getText('hero', 'hero-title'),
    heroSubtitle: getText('hero', 'hero-subtitle'),
    heroImage: getImage('hero', 'hero-image'),
    morphingTexts: getArray('hero', 'morphing-texts'),
    launchingText: getText('hero', 'launching-text'),
    brandName: getText('navigation', 'brand-name'),
    brandLogo: getImage('navigation', 'brand-logo'),
    howItWorksItems: getNavMenuLabels('navigation', 'how-it-works-items'),
    companyItems: getNavMenuLabels('navigation', 'company-items'),
    howItWorksMenuItems: getNavMenuItems('navigation', 'how-it-works-items'),
    companyMenuItems: getNavMenuItems('navigation', 'company-items'),
    subscriptionTitle: getText('footer', 'subscription-title'),
    subscriptionSubtitle: getText('footer', 'subscription-subtitle'),
    copyrightText: getText('footer', 'copyright-text'),
    instagramIcon: getImage('footer', 'instagram-icon'),
    linkedinIcon: getImage('footer', 'linkedin-icon'),
    siteTitle: getText('general', 'site-title'),
    metaDescription: getText('general', 'meta-description'),
    siteFavicon: getImage('general', 'site-favicon'),
    // Why Sourced section getters
    whySourcedBadge: getText('whySourced', 'why-sourced-badge'),
    whySourcedTitle: getText('whySourced', 'why-sourced-title'),
    accordionItems: getArray('whySourced', 'accordion-items'),
    // Pages and footer links
    sitePages: getArray('pages', 'site-pages'),
    footerColumns: getArray('footerLinks', 'footer-columns')
  };
};

export type { ContentData, ContentSection }; 