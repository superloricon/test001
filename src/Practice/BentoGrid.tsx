import { useState } from "react";
import { StarRating } from "./StartRating";

export const BentoGrid = () => {
  const [rating, setRating] = useState<number>(0);
  return (
    <div className="h-full w-full pb-12">
      <div className="font-bold text-xl md:text-3xl mb-2 px-4 md:px-20">
        Practice 05: BentoGrid
      </div>
      <div className="bg-[#f5f5f5] p-4 pt-10 md:p-20">
        <div className="hidden grid-cols-4 gap-8 h-[1400px] p-4 md:grid ">
          <div className="relative">
            <div className="bg-[#faeee2] absolute w-full top-0 h-[342px] xl:h-[682px] rounded-xl flex ">
              <div className="text-2xl/[24px] xl:text-[52px]/[52px] font-medium flex flex-col w-full h-full py-20 px-4 xl:px-12">
                <p className="w-full">
                  Create and schedule content{" "}
                  <span className="text-[#8968d4] italic">quicker.</span>
                </p>
                <button>
                  <img
                    src="/Images/BentoGrid/illustration-create-post.webp"
                    className="mt-8"
                    alt="Illustration"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="text-[72px]/[72px] bg-[#7651dc] col-span-2 rounded-xl gap-4 flex flex-col  justify-center items-center text-white text-center font-medium px-16">
            <div>
              Social Media <span className="text-[#fecc77] mr-4">10x </span>
              <span className=" italic ">Faster</span> with AI
            </div>
            <div className="flex flex-col items-center gap-1">
              <StarRating
                maxRating={5}
                rating={rating}
                onRatingChange={setRating}
              />
              <p className="text-2xl font-medium text-gray-200">
                Over 4,000 5-star reviews
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#dbd1fc] absolute w-full top-0 h-[992px] rounded-xl overflow-hidden">
              <div className="m-8 my-16 flex gap-8 flex-col">
                <p className="font-medium text-[40px]/[40px] w-72">
                  Schedule to social media.
                </p>
                <img
                  src="Images/BentoGrid/illustration-schedule-posts.webp"
                  className="h-72 min-w-[270px] z-0 "
                  alt="schedule"
                />
                <div className="max-w-72 ">
                  <p className="font-medium text-2xl ">
                    Optimize post timings to publish content at the perfect time
                    for your audience
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white col-start-2 col-end-3 rounded-xl relative overflow-hidden">
            <div className="flex flex-col absolute my-4 gap-10 w-full h-full">
              <img
                src="Images/BentoGrid/illustration-multiple-platforms.webp"
                alt="multiple"
              />

              <p className="font-semibold  text-[48px]/[40px] mx-8">
                Manage multiple accounts and platforms
              </p>
            </div>
          </div>
          <div className="bg-[#ffcd6a] rounded-xl flex relative overflow-hidden">
            <div className="mt-6 px-8 flex flex-col absolute gap-6">
              <div className="max-w-52">
                <p className="font-semibold text-[40px]/[40px]">
                  Maintain a consistent posting schedule.
                </p>
              </div>
              <img
                src="/Images/BentoGrid/illustration-consistent-schedule.webp"
                alt="schedule"
              />
            </div>
          </div>
          <div className="relative col-start-1">
            <div className="bg-[#ffcd6a] absolute w-full bottom-0 h-[542px] xl:h-[652px] rounded-xl p-8 pr-4">
              <div className="flex flex-col justify-between h-full gap-20">
                <p className="font-medium text-[52px]/[48px] w-72">
                  Write your content using AI.
                </p>
                <img
                  src="Images/BentoGrid/illustration-ai-content.webp"
                  alt="illustration-ai-content"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl relative ">
            <div className="absolute p-8 flex-col flex gap-4">
              <p className="text-[72px]/[72px] font-semibold">&gt;56%</p>
              <p className="text-3xl ">faster audience growth</p>
              <div className="mt-8 mr-20">
                <img
                  src="Images/BentoGrid/illustration-audience-growth.webp"
                  alt="audience"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#7651dc] col-span-2 rounded-xl relative">
            <div className="absolute p-8 flex h-full">
              <img
                src="/Images/BentoGrid/illustration-grow-followers.webp"
                alt="followers"
              />
              <div className="h-full justify-center items-center flex mx-4">
                <p className="text-white font-medium text-[52px]/[48px]">
                  Grow followers with non-stop content
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-cols-1 gap-8 h-full grid md:hidden">
          <div className="text-[38px]/[38px] sm:text-[52px]/[52px] bg-[#7651dc] rounded-xl gap-4 flex flex-col justify-center items-center text-white text-center font-medium p-8">
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
            <div className="flex flex-col my-4 gap-10 size-full items-center">
              <img
                src="Images/BentoGrid/illustration-multiple-platforms.webp"
                alt="multiple"
                className="w-full"
              />
              <p className="font-semibold text-3xl md:text-[42px]/[42px] px-4">
                Manage multiple accounts and platforms
              </p>
            </div>
          </div>
          <div className="bg-[#ffcd6a] rounded-xl flex relative overflow-hidden">
            <div className="mt-6 px-5 flex flex-col gap-6">
              <p className="font-semibold text-3xl">
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
                <p className="font-medium text-3xl text-center">
                  Schedule to social media.
                </p>
                <img
                  src="Images/BentoGrid/illustration-schedule-posts.webp"
                  className="w-72 z-0"
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
            <div className="py-6 px-16 flex items-center h-full flex-col gap-8">
              <img
                src="/Images/BentoGrid/illustration-grow-followers.webp"
                alt="followers"
                className="w-72"
              />
              <div className=" justify-center items-center flex">
                <p className="text-white font-semibold text-2xl/[24px] text-center">
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
              <p className="font-semibold text-3xl/[30px] ">
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
  );
};
