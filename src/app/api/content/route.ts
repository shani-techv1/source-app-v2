import { NextRequest, NextResponse } from 'next/server';

// In a real application, this would connect to a database
// For now, we'll use a simple file-based storage or environment variables

export async function GET() {
  try {
    // In production, fetch from database
    // For now, return default content structure
    const defaultContent = {
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
          type: 'navMenu',
          value: ['For Talent|/for-talent', 'For Agents|/for-agents', 'Pricing|/pricing', 'Security|/security']
        },
        {
          id: 'company-items',
          title: 'Company Menu Items',
          type: 'navMenu',
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
          type: 'accordion',
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
          type: 'pages',
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
          type: 'footerLinks',
          value: [
            'Account|login:Login,join:Join',
            'How It Works|pricing:Pricing,booking:Booking,for-creator:For a Creator,for-agency:For an Agency',
            'Company|about:About,contact:Contact,careers:Careers',
            'Legal|terms:Terms,privacy:Privacy'
          ]
        }
      ]
    };

    return NextResponse.json(defaultContent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    
    // In production, save to database
    // For now, we'll just validate the structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content structure' },
        { status: 400 }
      );
    }

    // Here you would save to your database
    // await saveContentToDatabase(content);

    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Handle partial updates
  try {
    const updates = await request.json();
    
    // In production, merge with existing content in database
    // For now, just return success
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 