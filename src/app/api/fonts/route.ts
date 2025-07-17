import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/lib/models/Content';

// Type for the database response
interface ContentSection {
  section: string;
  items: Array<{
    id: string;
    title: string;
    type: string;
    value: string | string[];
    placeholder?: string;
    maxLength?: number;
  }>;
  updatedAt: Date;
}

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch the general section from database
    const generalSection = await Content.findOne({ section: 'general' }).lean();
    
    if (!generalSection) {
      // Return default font if no content exists
      return NextResponse.json({
        fonts: ['Inter Tight'],
        defaultFont: 'Inter Tight'
      });
    }
    
    // Handle the database response safely
    const section = generalSection as unknown as ContentSection;
    
    // Find the google-font item in the general section
    const googleFontItem = section.items?.find((item) => item.id === 'google-font');
    
    if (!googleFontItem) {
      // Return default font if google-font item doesn't exist
      return NextResponse.json({
        fonts: ['Inter Tight'],
        defaultFont: 'Inter Tight'
      });
    }
    
    // Extract the font value
    const fontValue = googleFontItem.value;
    
    // Handle both string and array values
    let fonts: string[] = [];
    let defaultFont: string = 'Inter Tight';
    
    if (typeof fontValue === 'string') {
      fonts = [fontValue];
      defaultFont = fontValue;
    } else if (Array.isArray(fontValue)) {
      fonts = fontValue;
      defaultFont = fontValue[0] || 'Inter Tight';
    }
    
    return NextResponse.json({
      fonts,
      defaultFont,
      lastUpdated: section.updatedAt
    });
    
  } catch (error) {
    console.error('Error fetching fonts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch fonts',
        fonts: ['Inter Tight'],
        defaultFont: 'Inter Tight'
      },
      { status: 500 }
    );
  }
}


