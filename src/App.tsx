import { BentoGrid } from "./Practice/BentoGrid";
import { FlashCards } from "./Practice/FlashCards";
import { PricingTable } from "./Practice/PricingTable";
import { Textarea } from "./Practice/Textarea";
import { ToastButton } from "./Practice/ToastButton";
import { Toaster } from "react-hot-toast";
import "../src/index.css";
import { ConferenceTicketGenerator } from "./Practice/ConferenceTicketGenerator";
import { BillingInformation } from "./Practice/BillingInformation";
// import { CountryPage } from "./Practice/CountryPage";
import { Analytics } from "@vercel/analytics/react";

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
          {/* <CountryPage /> */}
          <Analytics />
        </div>
      </div>
    </>
  );
}

export default App;
