const LibraryMeta = {
  name: "Library",
  section: "⚙️ Système",
  displayName: "Library Manager",
  description: "Interface pour gérer les composants via l'API",
  thumbnailUrl: "https://plasmic-api.agence-scroll.com/library.png",
  props: {
    title: {
      type: "string",
      defaultValue: "Available soon.",
    },
    imageUrl: {
      type: "string",
      defaultValue: "https://plasmic-api.agence-scroll.com/library.webp",
    },
    buttonText: {
      type: "string",
      defaultValue: "Paramètres",
    },
    showHeader: {
      type: "boolean",
      defaultValue: true,
      description: "Afficher ou masquer le header de la carte",
    },
    headerTitle: {
      type: "string",
      defaultValue: "Librairie plasmic",
      description: "Titre du header",
    },
    headerSubtitle: {
      type: "string",
      defaultValue: "Manager",
      description: "Sous-titre du header",
    },
    headerDescription: {
      type: "string",
      defaultValue: "12 composants",
      description: "Description du header",
    },
    apiUrl: {
      type: "string",
      defaultValue: "https://plasmic-api.agence-scroll.com/api/",
      description: "URL de l'API à contacter"
    }
  },
  importPath: "./components/Library/Library",
};

export default LibraryMeta;
