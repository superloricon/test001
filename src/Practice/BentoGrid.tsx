import { useState } from "react";
import { StarRating } from "./StartRating";

export const BentoGrid = () => {
  const [rating, setRating] = useState<number>(0);
  return (
    <div className="h-full w-full ">
      <div className="bg-[#f5f5f5] pt-10 ">
        <div className="font-bold text-xl sm:text-3xl px-4 md:px-20 pb-8 md:pb-10">
          Practice 05: BentoGrid
        </div>
        <div className="pb-4 px-4 xl:pb-12 xl:px-20 w-full flex items-center justify-center">
          <div className="hidden grid-cols-4 gap-4 w-full md:grid max-w-[1920px]">
            <div className="row-span-3 flex flex-col col-span-1 gap-4">
              <div className="bg-[#faeee2]  rounded-xl flex w-full h-[40%] ">
                <div className="text-2xl/[24px] font-medium flex flex-col w-full h-full justify-center px-5  ">
                  <p>
                    Create and schedule content
                    <span className="text-[#8968d4] italic"> quicker.</span>
                  </p>
                  <button>
                    <img
                      src="/Images/BentoGrid/illustration-create-post.webp"
                      className="mt-4 w-full max-w-[180px] xl:max-w-[220px]"
                      alt="Illustration"
                    />
                  </button>
                </div>
              </div>
              <div className="bg-[#ffcd6a] flex  rounded-xl py-5 pl-5 h-[60%]">
                <div className="flex flex-col justify-between h-full gap-10">
                  <p className="font-semibold  text-2xl/[24px]  mr-5">
                    Write your content using AI.
                  </p>
                  <img
                    src="Images/BentoGrid/illustration-ai-content.webp"
                    alt="illustration-ai-content"
                    className="pr-2 min-w-[155px] max-w-[280px] w-full"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-[#7651dc] w-full rounded-xl flex h-full p-10">
              <div className="text-[36px]/[36px] font-semibold flex flex-col w-full h-full justify-center items-center text-center text-white xl:text-[48px]/[48px]">
                <div className="max-w-[289px] w-full xl:max-w-[380px]">
                  Social Media <span className="text-[#fecc77]">10x </span>
                  <span className="italic ">Faster</span> with AI
                </div>
                <div className="mt-2">
                  <StarRating
                    maxRating={5}
                    rating={rating}
                    onRatingChange={setRating}
                  />
                </div>
                <p className="text-xs font-medium text-gray-200 mt-2 xl:mt-4 ">
                  Over 4,000 5-star reviews
                </p>
              </div>
            </div>
            <div className="col-span-1 row-span-2 flex bg-[#dbd1fc] rounded-xl w-full h-full ">
              <div className="text-xl/[20px] font-semibold w-full h-full py-7 pl-5 flex flex-col gap-4">
                <p className="mr-4">Schedule to social media</p>
                <div className="w-full overflow-hidden pr-5">
                  <img
                    src="Images/BentoGrid/illustration-schedule-posts.webp"
                    className="min-w-[245px]"
                    alt="schedule"
                  />
                </div>

                <p className="font-medium text-xs/[14px] mr-4">
                  Optimize post timings to publish content at the perfect time
                  for your audience
                </p>
              </div>
            </div>
            <div className="col-span-1 flex bg-white rounded-xl w-full h-full ">
              <div className="text-xl/[20px] font-semibold w-full h-full py-7 pl-4 flex flex-col gap-4">
                <div className="w-full overflow-hidden pr-4">
                  <img
                    src="Images/BentoGrid/illustration-multiple-platforms.webp"
                    alt="multiple"
                    className="min-w-[215px]"
                  />
                </div>

                <p className="font-medium text-[23px]/[20px] pr-4 ">
                  Manage multiple accounts and platforms.
                </p>
              </div>
            </div>
            <div className="bg-[#ffcd6a]  rounded-xl flex  overflow-hidden w-full h-full ">
              <div className="pt-5 px-5 flex flex-col gap-4 ">
                <p className="font-semibold text-[20px]/[20px]">
                  Maintain a consistent posting schedule.
                </p>
                <img
                  src="/Images/BentoGrid/illustration-consistent-schedule.webp"
                  alt="schedule"
                  className="h-full w-full max-w-[200px]"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl flex w-full h-full">
              <div className=" p-5 flex-col flex gap-4">
                <p className="text-[36px]/[36px] font-semibold">&gt;56%</p>
                <p className="text-xs ">faster audience growth</p>
                <div className="mt-4 h-full w-full flex pr-4">
                  <img
                    src="Images/BentoGrid/illustration-audience-growth.webp"
                    alt="audience"
                    className="w-full max-w-[180px] "
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-[#7651dc] flex items-center justify-center rounded-xl w-full h-full">
              <div className="p-4 flex h-full">
                <img
                  src="/Images/BentoGrid/illustration-grow-followers.webp"
                  alt="followers"
                  className="w-full min-w-[160px] max-w-[200px]"
                />
                <div className="h-full justify-center items-center flex mx-1">
                  <p className="text-white font-semibold text-2xl/[24px]">
                    Grow followers with non-stop content
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-cols-1 gap-8 h-full grid md:hidden">
            <div className="text-[42px]/[42px] sm:text-[52px]/[52px] bg-[#7651dc] rounded-xl gap-4 flex flex-col justify-center items-center text-white text-center font-medium p-10">
              <div className="max-w-[250px] sm:max-w-[300px]">
                Social Media <span className="text-[#fecc77]">10x </span>
                <span className="italic">Faster</span> with AI
              </div>
              <div className="flex flex-col items-center gap-1 ">
                <StarRating
                  maxRating={5}
                  rating={rating}
                  onRatingChange={setRating}
                />
                <p className="text-xl sm:text-2xl font-medium text-gray-200">
                  Over 4,000 5-star reviews
                </p>
              </div>
            </div>
            <div className="w-full rounded-xl bg-white">
              <div className="flex flex-col my-4 gap-2 size-full items-center">
                <img
                  src="Images/BentoGrid/illustration-multiple-platforms.webp"
                  alt="multiple"
                  className="max-w-[406px] w-full"
                />
                <p className="font-medium text-[28px]/[28px] px-4 ">
                  Manage multiple accounts and platforms
                </p>
              </div>
            </div>
            <div className="bg-[#ffcd6a] rounded-xl flex relative overflow-hidden">
              <div className="mt-6 px-5 flex flex-col gap-6">
                <p className="font-medium text-[28px]/[28px]">
                  Maintain a consistent posting schedule.
                </p>
                <img
                  src="/Images/BentoGrid/illustration-consistent-schedule.webp"
                  alt="schedule"
                  className="w-72 h-full"
                />
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#dbd1fc] w-full top-0 rounded-xl overflow-hidden">
                <div className="m-4 my-8  flex gap-8 flex-col items-center ">
                  <p className="font-medium text-[26px]/[26px] text-center">
                    Schedule to social media.
                  </p>
                  <img
                    src="Images/BentoGrid/illustration-schedule-posts.webp"
                    className="w-full max-w-[300px] z-0"
                    alt="schedule"
                  />

                  <p className="font-medium text-xl text-center">
                    Optimize post timings to publish content at the perfect time
                    for your audience
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#7651dc] rounded-xl relative">
              <div className="py-6 px-14 flex items-center h-full flex-col gap-8">
                <img
                  src="/Images/BentoGrid/illustration-grow-followers.webp"
                  alt="followers"
                  className="w-full max-w-[231px]"
                />
                <div className=" justify-center items-center flex">
                  <p className="text-white font-medium text-3xl/[26px] text-center">
                    Grow followers with non-stop content
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl relative bg-white ">
              <div className=" p-6 flex-col flex ">
                <p className="text-[48px]/[72px] font-semibold">&gt;56%</p>
                <p className="text-xl ">faster audience growth</p>
                <div className="mt-4 mr-20 pr-12">
                  <img
                    src="Images/BentoGrid/illustration-audience-growth.webp"
                    alt="audience"
                    className="w-48"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#faeee2] w-full rounded-xl flex">
              <div className="text-[28px]/[28px] font-medium flex flex-col w-full h-full py-8 px-8">
                <div className="flex items-center gap-2">
                  <p className="w-full">
                    Create and schedule content{" "}
                    <span className="text-[#8968d4] italic">quicker.</span>
                  </p>
                </div>
                <button>
                  <img
                    src="/Images/BentoGrid/illustration-create-post.webp"
                    className="mt-4 w-48 "
                    alt="Illustration"
                  />
                </button>
              </div>
            </div>

            <div className="bg-[#ffcd6a] w-full bottom-0 rounded-xl p-6 pr-4">
              <div className="flex flex-col justify-between h-full gap-8">
                <p className="font-semibold text-[28px]/[28px] ">
                  Write your content using AI.
                </p>
                <img
                  src="Images/BentoGrid/illustration-ai-content.webp"
                  alt="illustration-ai-content"
                  className="w-72"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
