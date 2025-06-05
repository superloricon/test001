import { useState } from "react";

interface FlashCard {
  id: number;
  question: string;
  answer: string;
  isCompleted: boolean;
}

const initialCards: FlashCard[] = [
  {
    id: 1,
    question: "What is React?",
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
      <div className="font-bold text-xl sm:text-3xl mb-2">
        Practice 02: FlashCard
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mb-2 border-black-500 border-2 rounded-xl p-1 items-center">
        <div className="flex items-center w-full">
          <div
            className="h-8 bg-blue-500 rounded-lg transition-all duration-300 w-10/12 items-center flex"
            style={{ width: `${progress}%` }}
          />
          <p className="ml-1"> {Math.round(progress)}%</p>
        </div>
        <p className="w-3/12 sm:w-1/12 text-end mr-1 ">
          {currentIndex + 1} of {cards.length}
        </p>
      </div>
      {/* Flash Card */}
      <div className="p-1 flex flex-col gap-1 border-black-500 border-2 rounded-xl">
        <div
          className="relative h-64 w-full cursor-pointer flex items-center justify-center bg-gray-100 rounded-lg"
          onClick={handleFlipAndComplete}
        >
          <p className="text-xl text-center">
            {isFlipped
              ? cards[currentIndex].answer
              : cards[currentIndex].question}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between bg-gray-100 rounded-lg text-black font-medium h-10 gap-2 text-sm/4 sm:text-base">
          <button
            onClick={handlePrev}
            className="w-full rounded hover:bg-gray-300 cursor-pointer text-left text-gray-600"
            disabled={currentIndex === 0}
          >
            <p className="ml-2 sm:ml-4"> Previous</p>
          </button>

          <button
            onClick={handleFlipAndComplete}
            className="w-full font-semibold rounded hover:bg-gray-300"
          >
            {isFlipped ? " Hide Answer" : " Show Answer"}
          </button>

          <button
            onClick={handleNext}
            className="w-full rounded hover:bg-gray-300 text-end text-gray-600"
          >
            <p className="mr-2 sm:mr-4 "> Next</p>
          </button>
        </div>
      </div>
    </div>
  );
};
