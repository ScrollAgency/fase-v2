import React from "react";

interface ShareButtonProps {
  className?: string; // Classe CSS pour personnaliser le bouton
  children?: React.ReactNode; // Contenu pour le variant link
  title?: string; // Titre personnalisé pour le partage
  description?: string; // Description personnalisée pour le partage
  image?: string; // URL de l'image à partager
}

const ShareButton: React.FC<ShareButtonProps> = ({
  className = "",
  children,
  title,
  description,
  image
}) => {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        const shareData: ShareData = {
          title: title || document.title,
          text: description,
          url: window.location.href,
        };

        if (image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const file = new File([blob], 'shared-image.jpg', { type: blob.type });
          shareData.files = [file];
        }

        await navigator.share(shareData);
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
