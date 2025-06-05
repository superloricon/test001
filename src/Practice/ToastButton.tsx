import React, { useState } from "react";
import Toast from "./Toast";

type ToastType = "success" | "error" | "warning" | "info";

const messages: Record<ToastType, string> = {
  success: "Your content successfully added!",
  error: "Your content successfully deleted!",
  warning: "Your image is 5MB, it may load longer!",
  info: "Your content is publicly visible",
};

export const ToastButton: React.FC = () => {
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const handleShowToast = (type: ToastType) => {
    setToast({ type, message: messages[type] });
  };

  return (
    <div className="h-full w-full px-4 md:px-20">
      <div className="font-bold text-xl md:text-3xl md:pb-10 pb-8">
        Practice 04: Toast
      </div>
      <div className="flex flex-col space-y-4">
        {(["success", "error", "warning", "info"] as ToastType[]).map(
          (type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg text-white ${
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                  ? "bg-red-500"
                  : type === "warning"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
              onClick={() => handleShowToast(type)}
            >
              Show {type.charAt(0).toUpperCase() + type.slice(1)} Toast
            </button>
          )
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ToastButton;
