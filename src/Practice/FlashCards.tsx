import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

interface FlashCard {
  id: number;
  question: string;
  answer: string;
  isCompleted: boolean;
}

const initialCards: FlashCard[] = [
  {
    id: 1,
    question: "What is the difference between var,let,and const?",
    answer: "A JavaScript library for building user interfaces",
    isCompleted: false,
  },
  {
    id: 2,
    question: "What is TypeScript?",
    answer: "A typed superset of JavaScript that compiles to plain JavaScript",
    isCompleted: false,
  },
  {
    id: 3,
    question: "What is Tailwind CSS?",
    answer: "A utility-first CSS framework for rapidly building custom designs",
    isCompleted: false,
  },
];

export const FlashCards = () => {
  const [cards, setCards] = useState<FlashCard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const progress =
    (cards.filter((card) => card.isCompleted).length / cards.length) * 100;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlipAndComplete = () => {
    setIsFlipped(!isFlipped);
    setCards((prevCards) =>
      prevCards.map((card, index) =>
        index === currentIndex ? { ...card, isCompleted: true } : card
      )
    );
  };

  return (
    <div className="h-full w-full px-4 md:px-20">
      <div className="font-bold text-xl sm:text-3xl md:pb-10 pb-8">
        Practice 02: FlashCard
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mb-2 border-[#bfbfbf] border-2 rounded-xl p-1 items-center font-semibold font-quicksand">
        <div className="flex items-center w-full">
          <div
            className="h-8 bg-[#bfbfbf] rounded-lg transition-all duration-300 items-center flex"
            style={{ width: `${progress}%` }}
          />
          <p className="ml-2"> {Math.round(progress)}%</p>
        </div>
        <p className="min-w-[50px] xs:min-w-[60px] text-end mr-1 ">
          {currentIndex + 1} of {cards.length}
        </p>
      </div>
      {/* Flash Card */}
      <div className="p-1 flex flex-col gap-1 border-black-500 border-2 rounded-xl font-semibold font-quicksand border-[#bfbfbf]">
        <div
          className="relative h-64 w-full cursor-pointer flex items-center justify-center bg-gray-100 rounded-lg"
          onClick={handleFlipAndComplete}
        >
          <p className="text-3xl text-center font-black px-8">
            {isFlipped
              ? cards[currentIndex].answer
              : cards[currentIndex].question}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between bg-gray-100 rounded-lg text-black font-semibold h-10 gap-2 text-sm/4 sm:text-xl w-full px-2">
          <button
            onClick={handlePrev}
            className="w-full rounded hover:bg-gray-200 cursor-pointer text-left text-gray-600 flex items-center "
            disabled={currentIndex === 0}
          >
            <FiChevronLeft />
            <p className="ml-1"> Previous</p>
          </button>

          <button
            onClick={handleFlipAndComplete}
            className="w-full font-semibold rounded hover:bg-gray-300"
          >
            {isFlipped ? " Hide Answer" : " Show Answer"}
          </button>

          <button
            onClick={handleNext}
            className="w-full rounded hover:bg-gray-300  text-gray-600 flex items-center justify-end"
          >
            <p className="mr-1"> Next</p>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
