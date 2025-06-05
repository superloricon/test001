import { useState } from "react";

export const Textarea = () => {
  const [text, setText] = useState("");
  const maxLength = 100;
  const isLimitReached = text.length >= maxLength;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };

  return (
    <div className="relative w-full px-4 md:px-20">
      <div className="font-bold sm:text-3xl mb-2 text-xl">
        Practice 01: Textarea
      </div>
      <textarea
        className={`w-full p-4 pb-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
          isLimitReached
            ? "border-red-500 text-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        rows={5}
        value={text}
        onChange={handleChange}
        placeholder="输入内容..."
      />
      <div
        className={`absolute bottom-2 right-3 text-sm ${
          isLimitReached ? "text-red-500" : "text-gray-500"
        }`}
      >
        {text.length}/{maxLength}
      </div>
    </div>
  );
};
