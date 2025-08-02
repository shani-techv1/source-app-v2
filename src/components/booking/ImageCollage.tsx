// app/components/ImageCollage.tsx
'use client'

import Image from 'next/image'

const images = [
  'https://picsum.photos/id/1018/600/800',
  'https://picsum.photos/id/1021/600/400',
  'https://picsum.photos/id/1032/500/500',
  'https://picsum.photos/id/1043/700/500',
  'https://picsum.photos/id/1052/600/600',
  'https://picsum.photos/id/1069/400/600',
]

export default function ImageCollage() {
  return (
    <div className="relative w-full max-w-4xl h-[400px] mx-auto">
      {/* Center reference point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <Image
          src={images[0]}
          alt="Main"
          width={300}
          height={400}
          className="object-cover shadow-lg"
        />
      </div>

      {/* Overlapping images positioned relative to center */}
      <ImageLayer src={images[1]} className="left-1/2 top-1/2 -translate-x-full -translate-y-full -ml-8 -mt-8 z-10" />
      <ImageLayer src={images[2]} className="left-1/2 top-1/2 translate-x-4 -translate-y-full -mt-4 z-20" />
      <ImageLayer src={images[3]} className="left-1/2 top-1/2 -translate-x-full translate-y-4 -ml-4 z-10" />
      <ImageLayer src={images[4]} className="left-1/2 top-1/2 translate-x-8 translate-y-8 z-20" />
      <ImageLayer src={images[5]} className="left-1/2 bottom-2/3 -translate-x-full translate-y-full -ml-12 z-0" />
    </div>
  )
}

function ImageLayer({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`absolute w-56 h-72 ${className}`}>
      <Image
        src={src}
        alt="Gallery Image"
        width={180}
        height={220}
        className="object-cover shadow-md"
      />
    </div>
  )
}
