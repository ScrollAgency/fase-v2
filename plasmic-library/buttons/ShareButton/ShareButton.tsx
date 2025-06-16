import React from "react";

interface ShareButtonProps {
  iconSrc?: string; // Icône
  width?: number; // Largeur de l'image
  height?: number; // Hauteur de l'image
  className?: string; // Classe CSS pour personnaliser le bouton
}

const ShareButton: React.FC<ShareButtonProps> = ({
  iconSrc,
  width = 20,
  height = 20,
  className = "",
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
    <img
      src={iconSrc}
      alt="Partager"
      width={width}
      height={height}
      onClick={handleShare}
      className={`cursor-pointer ${className}`} // Ajout de la classe personnalisée
      style={{ display: "inline-block" }}
    />
  );
};

export default ShareButton;
