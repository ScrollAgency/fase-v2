import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "classnames";
import Image from 'next/image';

interface JobCardProps extends VariantProps<typeof cardVariant> {
  state?: "default" | "liked" | "applied" | "new" | "lastMin";
  title: string;
  city: string;
  companyName: string;
  logo: string;
  tags?: string[];
  customIcons?: {
    mapPin?: string;
    car?: string;
    bus?: string;
    bicycle?: string;
    walk?: string;
  };
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFavoriteClick?: () => void; // Nouvelle prop pour gérer les favoris
}

export interface JobCardActions {
  click(): void;
}

const cardVariant = cva(
  "w-[330px] flex flex-col rounded-2xl bg-white shadow-md relative border border-solid cursor-pointer",
  {
    variants: {
      state: {
        default: "",
        liked: "",
        applied: "",
        new: "",
        lastMin: "",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const JobCard = forwardRef<JobCardActions, JobCardProps>(({
  state = "default",
  title,
  city,
  companyName,
  logo,
  tags = [],
  customIcons = {},
  className,
  onClick,
  onFavoriteClick, // Nouvelle prop
}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    click() {
      cardRef.current?.click();
    },
  }));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.();
  };

  return (
    <div
      ref={cardRef}
      className={cn(cardVariant({ state }), className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(e as any)}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-14 h-14">
          <Image
            src={logo}
            alt={`${companyName} logo`}
            fill
            className="object-contain rounded-md"
            sizes="56px"
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{companyName}</p>
        </div>
      </div>

      <div className="px-4 mt-2 flex items-center text-sm text-gray-600 gap-2">
        {customIcons.mapPin && (
          <Image
            src={customIcons.mapPin}
            alt="Location icon"
            width={16}
            height={16}
            aria-hidden="true"
          />
        )}
        <span>{city}</span>
        <div className="flex items-center gap-1 ml-auto">
          {Object.entries(customIcons).map(([key, value]) =>
            key !== 'mapPin' && value && (
              <Image
                key={key}
                src={value}
                alt={`${key} icon`}
                width={16}
                height={16}
                aria-hidden="true"
              />
            )
          )}
        </div>
      </div>
      {tags.length > 0 && (
        <div className="p-4 pt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-gray-900 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {state === "new" && (
        <div className="absolute top-2 left-2 bg-[#BAFE68] text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Nouveau
        </div>
      )}

      {state === "liked" && (
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-[#FF4D84] text-white rounded-full flex items-center justify-center hover:bg-[#FF3B6B] transition-colors"
          onClick={handleFavoriteClick}
          aria-label={state === "liked" ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          ❤
        </button>
      )}
    </div>
  );
});

JobCard.displayName = "JobCard";
export default JobCard;