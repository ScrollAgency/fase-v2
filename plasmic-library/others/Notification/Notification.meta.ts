const NotificationMeta = {
  name: "Notification",
  section: "🔔 Notifications",
  displayName: "Notification",
  description: "Composant de notification personnalisable (titre, description, position)",
  thumbnailUrl: "https://static1.plasmic.app/insertables/text.svg",
  props: {
    title: {
      type: "string",
      required: true,
      description: "Titre de la notification (Poppins 14 semibold)",
    },
    description: {
      type: "string",
      required: true,
      description: "Description de la notification (Poppins 12 regular)",
    },
    position: {
      type: "choice",
      options: ["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center", "center-center"],
      defaultValue: "top-right",
      description: "Position de la notification sur l'écran",
    },
    onClose: {
      type: "eventHandler",
      description: "Fonction appelée lors de la fermeture de la notification",
      argTypes: [],
    },
    className: {
      type: "string",
      defaultValue: "",
      description: "Classes CSS supplémentaires à appliquer",
    },
  },
  importPath: "./components/others/Notification/Notification",
};

export default NotificationMeta; 