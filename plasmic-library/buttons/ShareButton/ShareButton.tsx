import React from "react";

interface ShareButtonProps {

  className?: string; // Classe CSS pour personnaliser le bouton
  children?: React.ReactNode; // Contenu pour le variant link
}

const ShareButton: React.FC<ShareButtonProps> = ({
  className = "",
  children
}) => {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Erreur lors du partage :", err);
      }
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur");
    }
  };

  return (
    <div 
      onClick={handleShare}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default ShareButton;
