import React, { useState } from "react";

interface SitexDropdownProps {
  label?: string;
  options: Array<{
    id: string;
    label: string;
  }>;
  value?: string;
  onChange?: (value: { id: string }) => void;
}

const SitexDropdown = ({
  label = "Select",
  options,
  value,
  onChange,
}: SitexDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(value);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.({ id });
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.id === selected)?.label || "Choose...";

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow">
          {options.map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SitexDropdown;
