import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import styles from "./InputComboSelect.module.css";
import { ChevronUpIcon, ChevronDownIcon } from "@/plasmic-library/icons/icons";

export interface InputComboSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

function InputComboSelect_(
  props: InputComboSelectProps,
  ref: HTMLElementRefOf<"div">
) {
  const { value = 0, onChange, className } = props;
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);
  const closeDropdown = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      onChange?.(val);
    }
  };

  const handleSelect = (val: number) => {
    onChange?.(val);
    closeDropdown();
  };

  const options = Array.from({ length: 20 }, (_, i) => i + 1);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div
      ref={(node) => {
        wrapperRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={`${styles.wrapper} ${className}`}
    >
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button type="button" className={styles.icon} onClick={toggleDropdown}>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((val) => (
            <button
              key={`option-${val}`}
              type="button"
              className={styles.option}
              onClick={() => handleSelect(val)}
            >
              {val}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


const InputComboSelect = React.forwardRef(InputComboSelect_);
export default InputComboSelect;
