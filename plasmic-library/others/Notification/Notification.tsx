import React from "react";

export interface NotificationProps {
  title: string;
  description: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onClose?: () => void;
  className?: string;
}

const positionStyles: Record<string, React.CSSProperties> = {
  "top-right": { top: 24, right: 24, position: "fixed" },
  "top-left": { top: 24, left: 24, position: "fixed" },
  "bottom-right": { bottom: 24, right: 24, position: "fixed" },
  "bottom-left": { bottom: 24, left: 24, position: "fixed" },
};

const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  position = "top-right",
  onClose,
  className = "",
}) => {
  return (
    <div
      style={positionStyles[position]}
      className={`bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[400px] flex flex-col gap-2 ${className}`}
    >
      <div className="flex justify-between items-start">
        <span
          className="font-semibold text-[14px] leading-[20px]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Fermer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <p
        className="text-[12px] text-gray-700 mt-1"
        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}
      >
        {description}
      </p>
    </div>
  );
};

export default Notification; 