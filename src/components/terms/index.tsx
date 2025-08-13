'use client';
import React, { useState } from 'react'

interface PageData {
    html: string;
}

function Index({ pageData }: { pageData: PageData }) {
    const [activeTab, setActiveTab] = useState(0);
    const parts = pageData.html.split("Html for vendor");

    return (
        <div className="flex flex-col items-center justify-center bg-white p-6 pt-16">
            <div className="w-full flex border-b border-gray-400 pb-6">
                <div className='flex-1 mt-3'>
                    <h1 className="text-4xl font-bold text-black">Terms and Conditions</h1>
                    <p className="text-black mt-8 text-xl">For any questions please email info@ifsourced.ltd</p>
                </div>
                <div className='mt-1'>
                    <div className="flex space-x-4">
                        <button className={`${activeTab === 0 ? 'bg-black text-white' : 'bg-white text-black border border-black'} px-7 py-1 rounded`}
                            onClick={() => setActiveTab(0)}>Booker</button>
                        <button className={`${activeTab === 1 ? 'bg-black text-white' : 'bg-white text-black border border-black'} px-7 py-1 rounded`}
                            onClick={() => setActiveTab(1)}>Vendor</button>
                    </div>
                    <p className="text-[#2d518e] mt-4 text-md italic">This text is an example – I will write full
                        <br />information input in input folder in google drive</p>
                </div>
            </div>
            <div className="flex items-center justify-center bg-[#f2f2f2] mt-10">
                <div className="py-6 px-10 rounded-lg w-full text-center">
                    <h2 className="text-2xl mb-4 font-medium">Booker’s Terms and Conditions ("BTC")</h2>
                    <p className="text-black p-2 text-lg font-medium">
                        The Client must accept the following general terms and conditions for using Sourced Platform when <br /> registering for Sourced.
                    </p>
                </div>
            </div>
            {/* Tab Content */}
            <div className="mt-10 ">
                <div
                    dangerouslySetInnerHTML={{
                        __html: activeTab == 0 ? parts[0] : parts[1] || ""
                    }}
                    className='dynamic-content'
                />
            </div>
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
    )
}

export default Index