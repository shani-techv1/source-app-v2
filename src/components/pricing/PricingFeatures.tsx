export default function PricingFeatures() {
  const features = [
    {
      name: "Discover & Connect with Vendors",
      starter: "✓",
      tfp: "✓",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-black",
      tfpColor: "text-orange-500",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Star Ratings",
      starter: "✓",
      tfp: "✓",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-black",
      tfpColor: "text-orange-500",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Portfolio Management",
      starter: "✓",
      tfp: "✓",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-black",
      tfpColor: "text-orange-500",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Messaging",
      starter: "5 per day",
      tfp: "Unlimited",
      pro: "Unlimited",
      proTeam: "Unlimited",
      starterColor: "text-gray-900",
      tfpColor: "text-gray-900",
      proColor: "text-gray-900",
      proTeamColor: "text-gray-900"
    },
    {
      name: "No Commission",
      starter: "",
      tfp: "✓",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-orange-500",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Page Insights",
      starter: "",
      tfp: "",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "View Full Page Information",
      starter: "",
      tfp: "",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Generate Invoices",
      starter: "",
      tfp: "",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "ProSearch with AI",
      starter: "",
      tfp: "",
      pro: "✓",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-blue-300",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Team Accounts",
      starter: "",
      tfp: "",
      pro: "",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-gray-400",
      proTeamColor: "text-blue-600"
    },
    {
      name: "Discounted Volume Rate",
      starter: "",
      tfp: "",
      pro: "",
      proTeam: "✓",
      starterColor: "text-gray-400",
      tfpColor: "text-gray-400",
      proColor: "text-gray-400",
      proTeamColor: "text-blue-600"
    }
  ];

  return (
    <div className="divide-y divide-gray-200">
      {features.map((feature, index) => (
        <div key={index} className="grid grid-cols-12">
          <div className="col-span-4 flex items-center">
            <span className="text-gray-900 font-medium whitespace-nowrap">{feature.name}</span>
          </div>
          <div className="col-span-2 p-1 flex items-center justify-center">
            <span className={`${feature.starterColor} ${feature.starter === "✓" ? "text-xl" : ""}`}>
              {feature.starter || ""}
            </span>
          </div>
          <div className="col-span-2 p-1 flex items-center justify-center">
            <span className={`${feature.tfpColor} ${feature.tfp === "✓" ? "text-xl" : ""}`}>
              {feature.tfp || ""}
            </span>
          </div>
          <div className="col-span-2 p-1 flex items-center justify-center">
            <span className={`${feature.proColor} ${feature.pro === "✓" ? "text-xl" : ""}`}>
              {feature.pro || ""}
            </span>
          </div>
          <div className="col-span-2 p-1 flex items-center justify-center">
            <span className={`${feature.proTeamColor} ${feature.proTeam === "✓" ? "text-xl" : ""}`}>
              {feature.proTeam || ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 