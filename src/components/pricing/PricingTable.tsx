import PricingPlans from './PricingPlans';
import PricingFeatures from './PricingFeatures';

export default function PricingTable() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
        <PricingPlans />
        <PricingFeatures />
    </div>
  );
} 