export default function PricingPlans() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
      <h3>Choose the membership that’s right for you:</h3>
      </div>
      <div className="col-span-2 p-3 text-center flex flex-col">
        <h3 className="text-base font-semibold text-black mb-2">Starter</h3>
        <p className="text-sm font-normal text-black mb-4 flex-1">Free</p>
        <button className="w-3/4 mx-auto bg-black text-white text-sm py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors">
          Get Started
        </button>
      </div>
      
      <div className="col-span-2 p-3 text-center  flex flex-col">
        <div className="relative">
          <div className="border-orange-500 border text-orange-500 text-xs px-2 py-0 rounded mb-2 inline-block absolute bottom-3 right-6">
            TFP
          </div>
          <h3 className="text-base font-semibold text-black mb-2">TFP</h3>
        </div>
        <p className="text-sm font-normal text-black mb-4 flex-1">$20 / month</p>
        <button className="w-3/4 mx-auto bg-gray-400 text-white text-sm py-2 px-4 rounded-md font-medium cursor-not-allowed">
          Coming Soon
        </button>
      </div>
      
      <div className="col-span-2 p-3 text-center  flex flex-col">
        <div className="relative">
          <div className="border-blue-300 border text-blue-300 text-xs px-2 py-0 rounded mb-2 inline-block absolute bottom-3 right-6">
            PRO
          </div>
          <h3 className="text-base font-semibold text-black mb-2">Pro</h3>
        </div>
        <p className="text-sm font-normal text-black mb-4 flex-1">$60 / month</p>
        <button className="w-3/4 bg-gray-400 text-white text-sm mx-auto py-2 px-4 rounded-md font-medium cursor-not-allowed">
          Coming Soon
        </button>
      </div>
      
      <div className="col-span-2 p-3 text-center  flex flex-col">
        
        <div className="relative">
          <div className="border-blue-300 border text-blue-300 text-xs px-2 py-0 rounded mb-2 inline-block absolute bottom-3 right-0">
            PRO
          </div>
          <h3 className="text-base font-semibold text-black mb-2">Pro Team</h3>
        </div>
        <p className="text-sm font-normal text-black mb-4 flex-1">
          $20 / user / month<br />for 4+ users
        </p>
        <button className="w-3/4 mx-auto bg-gray-400 text-white text-sm py-2 px-4 rounded-md font-medium cursor-not-allowed">
          Coming Soon
        </button>
      </div>
    </div>
  );
} 