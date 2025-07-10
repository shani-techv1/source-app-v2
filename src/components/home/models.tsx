import { motion } from 'framer-motion';
import Image from "next/image";

// Example container & item variants:
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function ModelsSection({ models }: any) {
  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {models.map((model : any, index: any) => (
        <motion.div
          key={index}
          className="border border-black p-4 flex flex-col items-center hover:cursor-pointer"
          variants={itemVariants}
        >
          <div className="relative group w-full h-auto md:h-[450px] overflow-hidden">
            {/* IMAGE: Scales up on hover */}
            <Image
              src={model.image}
              alt={model.name}
              width={600}
              height={450}
              className="
                w-full h-full object-cover blur-lg invert
                transition-transform duration-500 
                group-hover:scale-110
              "
            />

            {/* SVG MASK: Only visible on hover */}
            <div className="
              absolute inset-0 
              pointer-events-none 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-500
            ">
              <svg className="w-full h-full">
                <defs>
                  <mask id={`text-mask-${index}`}>
                    {/* Entire region is white by default (visible) */}
                    <rect
                      width="100%"
                      height="100%"
                      fill="white"
                    />
                    {/* Text is black, so it "cuts out" from the white area */}
                    <text
                      x="50%"
                      y="50%"
                      fill="black"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      
                      fontWeight="bold"
                      letterSpacing="2"
                      className='w-screen text-4xl tracking-widest uppercase'
                    >
                      Coming Soon
                    </text>
                  </mask>
                </defs>

                {/* Black rectangle with semi-transparency uses the text mask */}
                <rect
                  width="100%"
                  height="100%"
                  fill="rgba(0,0,0,0.7)"
                  mask={`url(#text-mask-${index})`}
                />
              </svg>
            </div>
          </div>

          {/* Model Info */}
          <h2 className="text-2xl font-bold text-center mt-4 uppercase">
            {model.name}
          </h2>
          <div className="flex justify-between text-xs border-t border-black mt-2 pt-2 w-full">
            <span>{model.category}</span>
            <span>{model.year}</span>
            <span>{model.studio}</span>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
