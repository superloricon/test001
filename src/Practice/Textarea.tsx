import { useState } from "react";

export const Textarea = () => {
  const [text, setText] = useState(
    "adasdasdasdadadasddasddadadadasdadadasdadadadasddsadasdsadasgdfdafdtafdtdsatydfdtafdtadfadfatydafdadasdgasdgastdtdfsafdtsftdfastydfastdfadtyafdatydfdtasfdtasfdtysadfastydsfdtasfdtyadftydsafdtyadftdafdtyadftsfdtyfstyadfatydfatydfdtyafdatydfsdytfsadyta"
  );
  const maxLength = 250;
  const isLimitReached = text.length >= maxLength;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };

  return (
    <div className="relative w-full px-4 md:px-20">
      <div className="font-bold sm:text-3xl md:py-10 py-8 text-xl">
        Practice 01: Textarea
      </div>
      <div
        className={`h-52 border-2 border-black rounded-3xl pb-3 ${
          isLimitReached
            ? "border-red-500 text-red-500 focus:ring-red-500"
            : "border-black focus:ring-blue-500"
        }`}
      >
        <div className="p-4 pb-6 h-full">
          <textarea
            className="w-full h-full focus:outline-none focus:ring-0 resize-none font-semibold "
            rows={5}
            value={text}
            onChange={handleChange}
            placeholder="输入内容..."
          />
          <div
            className={`text-sm flex justify-end ${
              isLimitReached ? "text-red-500" : "text-black"
            }`}
          >
            {text.length}/{maxLength}
          </div>
        </div>
      </div>
    </div>
  );
};
