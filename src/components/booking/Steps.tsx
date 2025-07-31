'use client';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const steps = [
  {
    number: 1,
    title: 'Save Vendors',
    description: 'Filter your search and save vendors to your board or directly add to your picks.',
  },
  {
    number: 2,
    title: 'Create Your Project',
    description:
      'Add your job description, budget and dates. At any time you can edit your project.',
  },
  {
    number: 3,
    title: 'Share Project',
    description:
      'Share your project with your picks and await a responses. Within 24 hours the vendors will have accepted, denied or countered your offer.',
  },
  {
    number: 4,
    title: 'Confirm',
    description: 'Finalize your project with locking in confirmed vendors.',
  },
];

export default function Steps() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Section 1 and 2 */}
      <div className="grid md:grid-cols-1 gap-20 items-center">
        {
            steps.map((step, index) => {
                if(index%2 == 0)
                return <div key={index} className="space-y-10 grid grid-cols-2 gap-5">
                <StepCard step={step} />
                <div className="w-full max-w-md justify-self-end">
                  <AspectRatio ratio={16 / 9} className="relative">
                      <Image src="/coming-soon.png" fill alt="?"/>
                  </AspectRatio>
                </div>
              </div>
              return <div key={index} className="space-y-10 grid grid-cols-2 gap-5">
              <div className="w-full max-w-md">
              <AspectRatio ratio={16 / 9} className="relative">
                  <Image src="/coming-soon.png" fill alt="?"/>
              </AspectRatio>
            </div>
            <div className="justify-self-center">
            <StepCard step={step} />
            </div>
          </div>
            })
        }

        
      </div>

    </div>
  );
}

function StepCard({
  step,
  numberStyle = '',
}: {
  step: { number: number; title: string; description: string };
  numberStyle?: string;
}) {
  return (
    <div className={`flex items-start space-x-4`}>
      <div className={`text-7xl font-serif ${numberStyle}`}>{step.number}</div>
      <div className="w-72 mt-10 ml-5">
        <p className="font-bold">{step.title}</p>
        <p className="text-sm">{step.description}</p>
      </div>
    </div>
  );
}
