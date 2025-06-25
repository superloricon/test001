import React, { useState } from "react";
import { useScreenSize } from "../hooks/useScreenSize";
import { cn } from "../utils/cn";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "Per month",
    features: ["01", "100GB", "-", "-", "-", "-", "-", "-"],
  },
  {
    name: "Team",
    price: "$59",
    period: "Per month",
    features: ["10", "500GB", "15", "☑️", "-", "-", "-", "-"],
  },
  {
    name: "Popular",
    price: "$99",
    period: "Per month",
    features: ["50", "1 TB", "Unlimited", "☑️", "☑️", "☑️", "☑️", "☑️"],
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "Per month",
    features: [
      "Unlimited",
      "Unlimited",
      "Unlimited",
      "☑️",
      "☑️",
      "☑️",
      "☑️",
      "☑️",
    ],
  },
];

const featureTitles = [
  "Website number",
  "Server storage",
  "Database",
  "Unmetered Bandwidth",
  "SSD Disk",
  "VCPUS Fontworld",
  "World install",
  "Server speed",
];

export const PricingTable: React.FC = () => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const { width } = useScreenSize();

  return (
    <div className="h-full w-full px-4 md:px-20">
      <div
        className={cn("font-bold sm:text-3xl text-xl md:pb-10 pb-8 ", {
          "text-2xl": width! >= 400,
        })}
      >
        Practice 03: Pricing Table
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center bg-gray-50 w-full border-b-2 border-gray-200 shadow-sm py-8 px-4">
          <h2 className=" text-xl sm:text-3xl font-bold text-black mb-4">
            Pricing & Plans
          </h2>
          <p className="text-xs sm:text-base text-gray-600 text-center max-w-lg font-semibold">
            Discover the plan that unlocks the transformative power of digital
            art and join our vibrant community today.
          </p>
        </div>
        <div className="bg-white rounded-lg w-full mt-6 sm:mt-12">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <td />
                {pricingPlans.map((plan, index) => (
                  <td
                    key={plan.name}
                    className={`sm:pb-10 pb-2 rounded-t-xl ${
                      hoveredCol === index ? "bg-black" : ""
                    }`}
                    onMouseEnter={() => setHoveredCol(index)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="flex h-full flex-col items-center">
                      <p
                        className={`font-semibold sm:text-sm text-xs w-full text-center mt-4 max-w-24 lg:text-lg ${
                          hoveredCol === index
                            ? "bg-blue-600 rounded-xl text-white"
                            : "text-blue-500"
                        }`}
                      >
                        {plan.name}
                      </p>
                      <p
                        className={`font-bold sm:text-[48px]/[78px] md:text-[50px]/[80px] lg:text-[64px]/[94px] text-2xl ${
                          hoveredCol === index ? "text-white" : "text-black"
                        }`}
                      >
                        {plan.price}
                      </p>

                      <p
                        className={`font-semibold text-center text-[9px] sm:text-xs lg:text-base ${
                          hoveredCol === index
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {plan.period}
                      </p>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureTitles.map((feature, rowIndex) => (
                <tr key={feature} className="h-10">
                  <td className="text-gray-900 bg-gray-100 text-[9px] px-1 font-bold text-center sm:text-xs  sm:px-2 lg:px-4 xl:text-left xl:text-sm">
                    {feature}
                  </td>
                  {pricingPlans.map((plan, colIndex) => (
                    <td
                      key={`${feature}-${plan.name}`}
                      className={`text-gray-900 text-center sm:text-base text-xs ${
                        hoveredCol === colIndex ? "bg-black" : "border-b"
                      }`}
                      onMouseEnter={() => setHoveredCol(colIndex)}
                      onMouseLeave={() => setHoveredCol(null)}
                    >
                      <p
                        className={
                          hoveredCol === colIndex
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        {plan.features[rowIndex]}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {pricingPlans.map((plan, index) => (
                  <td
                    key={`button-${plan.name}`}
                    className={`rounded-b-xl ${
                      hoveredCol === index
                        ? "bg-orange-400 text-white"
                        : "bg-white text-blue-600"
                    }`}
                    onMouseEnter={() => setHoveredCol(index)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="flex justify-center h-14 lg:text-base text-[9px] sm:text-sm md:text-left text-center mx-2 items-center">
                      <p className="font-bold">Get Started →</p>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
