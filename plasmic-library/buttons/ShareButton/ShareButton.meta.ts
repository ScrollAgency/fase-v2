export const ShareButtonMeta = {
   section: "Buttons",
   name: "ShareButton",
   displayName: "Bouton de Partage",
   props: {
      children: 'slot',
      title: {
         type: "string",
         description: "Titre du lien de partage",
      },
      description: {
         type: 'string',
         description: "Texte descriptif du lien"
      },
      image: {
         type: 'string',
         description: "image à afficher avec le lien"
      },
      url: {
         type: 'string',
         description: "url à partager, si vide lien vers la page actuelle"
      }
   },
   importPath: "./components/buttons/ShareButton/ShareButton",
};

export default ShareButtonMeta;
