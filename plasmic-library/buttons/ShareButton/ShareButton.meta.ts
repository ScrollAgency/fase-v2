export const ShareButtonMeta = {
   section: "ShareButton",
   name: "ShareButton",
   displayName: "Bouton de Partage",
   props: {
      iconSrc: {
         type: "imageUrl",
         description: "Icône à afficher pour le partage",
      },
      width: {
         type: "number",
         defaultValue: 20,
         description: "Largeur de l'icône",
      },
      height: {
         type: "number",
         defaultValue: 20,
         description: "Hauteur de l'icône",
      },
      className: {
         type: "string",
         description: "Classe CSS pour le design du bouton",
      },
   },
   importPath: "./components/ShareButton",
};

export default ShareButtonMeta;
