import React from "react";

interface ShareButtonProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  className = "",
  children,
  title,
  description,
  image,
  url
}) => {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        const shareData: ShareData = {
        //  title: title || document.title,
        //  text: description,
          url: url || window.location.href,
        };
/*
        if (image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const file = new File([blob], "shared-image.jpg", { type: blob.type });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          } else {
            console.warn("This browser cannot share images.");
          }
        }
*/
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error during sharing:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div onClick={handleShare} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export default ShareButton;
