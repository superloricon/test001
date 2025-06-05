// import { ConferenceTicketGenerator } from "./Practice/ConferenceTicketGenerator";
import { BentoGrid } from "./Practice/BentoGrid";
import { ConferenceTicketGenerator } from "./Practice/ConferenceTicketGenerator";
import { FlashCards } from "./Practice/FlashCards";
import { PricingTable } from "./Practice/PricingTable";
import { Textarea } from "./Practice/Textarea";
import { ToastButton } from "./Practice/ToastButton";

import "/Users/paymerm7/Documents/fe-practice/src/index.css";

function App() {
  return (
    <>
      <div className="flex bg-black w-full justify-center p-4">
        <p className="text-white text-2xl sm:text-3xl bg-black">
          2025 Practice Projects
        </p>
      </div>
      <div className="flex w-full justify-center mt-4">
        <div className="w-full flex flex-col justify-center items-center gap-20 ">
          <Textarea />
          <FlashCards />
          <PricingTable />
          <ToastButton />
          <BentoGrid />

          {/* <ConferenceTicketGenerator /> */}
          {/* <Toast /> */}
        </div>
      </div>
    </>
  );
}

export default App;
