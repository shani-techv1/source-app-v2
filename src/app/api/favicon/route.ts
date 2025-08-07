import dbConnect from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import { NextResponse } from 'next/server';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';
import { Buffer } from 'buffer';

export async function GET() {
  await dbConnect();

  const contentSections = await Content.find({}).lean();
  const content: Record<string, any[]> = {};

  contentSections.forEach(section => {
    content[section.section] = section.items;
  });

  const base64 = content?.general.find((item: any) => item.id === 'site-favicon')?.value;

  if (!base64 || !base64.startsWith('data:image')) {
    return new NextResponse('Favicon not found', { status: 404 });
  }

  const match = base64.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
  if (!match) {
    return new NextResponse('Invalid Base64 format', { status: 400 });
  }

  const mimeType = match[1]; // image/png, image/jpeg, etc.
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    if (mimeType === 'image/png' || mimeType === 'image/jpeg') {
      // Resize image to square (e.g., 256x256)
      const resizedPngBuffer = await sharp(buffer)
        .resize(256, 256, {
          fit: 'cover', // Crop to fit
          position: 'centre'
        })
        .png() // Ensure output is PNG for png-to-ico
        .toBuffer();

      const icoBuffer = await pngToIco(resizedPngBuffer);

      return new NextResponse(icoBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/x-icon',
          'Content-Length': icoBuffer.length.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // If already ICO, serve as-is
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error converting to ICO:', error);
    return new NextResponse('Failed to convert image to ICO', { status: 500 });
  }
}