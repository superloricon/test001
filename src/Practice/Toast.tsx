import React, { useEffect, useState } from "react";

interface ToastProps {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-50 text-green-700",
    error: "bg-red-50 text-red-700",
    warning: "bg-yellow-50 text-yellow-700",
    info: "bg-gray-50 text-gray-700",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex gap-3 font-medium text-xs items-center justify-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      } ${typeStyles[type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className="font-semibold">{type.toUpperCase()}:</span>
      {message}
    </div>
  );
};

export default Toast;
