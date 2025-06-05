import { SpeedInsights } from "@vercel/speed-insights/next";
import { BentoGrid } from "./Practice/BentoGrid";
import { BillingInformation } from "./Practice/BillingInformation";
import { FlashCards } from "./Practice/FlashCards";
import { PricingTable } from "./Practice/PricingTable";
import { Textarea } from "./Practice/Textarea";
import { ToastButton } from "./Practice/ToastButton";
import { Toaster } from "react-hot-toast";
import "../src/index.css";
import { ConferenceTicketGenerator } from "./Practice/ConferenceTicketGenerator";
import { CountryPage } from "./Practice/CountryPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex bg-black w-full justify-center p-4">
        <p className="text-white text-2xl sm:text-3xl bg-black">
          2025 Practice Projects
        </p>
      </div>
      <div className="flex w-full justify-center ">
        <div className="w-full h-full flex flex-col justify-center items-center gap-8 md:gap-10 ">
          <Textarea />
          <FlashCards />
          <PricingTable />
          <ToastButton />
          <BentoGrid />
          <ConferenceTicketGenerator />
          <BillingInformation />
          <CountryPage />
          <SpeedInsights />
        </div>
      </div>
    </>
  );
}

export default App;
