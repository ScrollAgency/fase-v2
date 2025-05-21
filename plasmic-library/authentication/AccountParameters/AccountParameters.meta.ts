const AccountParametersMeta = {
  name: "AccountParameters",
  section: "🔑 Authentication",
  displayName: "Account Parameters",
  description: "Affiche les informations de l'utilisateur et permet de réinitialiser le mot de passe.",
  thumbnailUrl: "https://plasmic-api.agence-scroll.com/forgot-password.png",
  
  props: {

    // Wrapper style
    wrapperStyle: {
      type: "choice",
      defaultValue: "card",
      options: ["simple", "card", "custom"],
      description: "Style du conteneur du formulaire",
    },

    // Title
    titleHeading: {
      type: "choice",
      defaultValue: "h2",
      options: ["h1", "h2", "h3"],
      description: "Niveau du titre de la section réinitialisation",
    },
    title: {
      type: "string",
      defaultValue: "Réinitialiser le mot de passe",
    },

    // Informations
    firstName: {
      type: "string",
      defaultValue: "",
      description: "Prénom de l'utilisateur",
    },
    lastName: {
      type: "string",
      defaultValue: "",
      description: "Nom de famille de l'utilisateur",
    },
    email: {
      type: "string",
      defaultValue: "",
      description: "Email de l'utilisateur",
    },
    role: {
      type: "string",
      defaultValue: "",
      description: "Rôle de l'utilisateur (ex: Admin, User)",
    },

    // Password
    passwordLabel: {
      type: "string",
      defaultValue: "Nouveau mot de passe*",
    },
    password: {
      type: "string",
      defaultValue: "",
      valueProp: "password",
      onChangeProp: "onPasswordChange",
    },
    passwordPlaceholder: {
      type: "string",
      defaultValue: "Entrez votre nouveau mot de passe",
    },
    confirmPasswordLabel: {
      type: "string",
      defaultValue: "Répétez le mot de passe*",
    },
    confirmPassword: {
      type: "string",
      defaultValue: "",
      valueProp: "confirmPassword",
      onChangeProp: "onConfirmPasswordChange",
    },
    confirmPasswordPlaceholder: {
      type: "string",
      defaultValue: "Confirmez votre mot de passe",
    },
    eyeIconColor: {
      type: "string",
      defaultValue: "#666",
      description: "Couleur de l'icône d'œil",
    },

    // Alerts
    alertPosition: {
      type: "choice",
      options: ["top", "bottom", "inline"],
      defaultValue: "top",
      description: "Position des alertes dans le composant",
    },
    maxAlerts: {
      type: "number",
      defaultValue: 3,
      description: "Nombre maximum d'alertes à afficher simultanément",
    },
    customErrorMessages: {
      type: "object",
      description: "Messages d'erreur personnalisés pour chaque type d'erreur",
    },
    resetSuccessMessage: {
      type: "string",
      defaultValue: "Votre mot de passe a été réinitialisé avec succès!",
      description: "Message affiché après une réinitialisation réussie",
    },

    // Boutons
    submitButtonText: {
      type: "string",
      defaultValue: "Enregistrer le nouveau mot de passe",
      description: "Texte du bouton de soumission",
    },
    submitButtonStyle: {
      type: "choice",
      defaultValue: "secondary",
      options: ["primary", "secondary", "tertiary"],
      description: "Style du bouton de soumission",
    },

    // Show / hide
    showTitle: {
      type: "boolean",
      defaultValue: false,
    },
    showPasswordStrength: {
      type: "boolean",
      defaultValue: true,
    },
    showPasswordToggle: {
      type: "boolean",
      defaultValue: true,
      description: "Affiche un bouton pour montrer/masquer le mot de passe",
    },
    showAlerts: {
      type: "boolean",
      defaultValue: true,
      description: "Affiche des alertes pour les erreurs et succès",
    },

    // Gestion des événements
    onSubmit: {
      type: "eventHandler",
      argTypes: [{ name: "event", type: "object" }],
      description: "Fonction appelée lors de la soumission du formulaire de réinitialisation",
    },
    onPasswordChange: {
      type: "eventHandler",
      argTypes: [{ name: "event", type: "object" }],
      description: "Appelée lors de la modification du mot de passe",
    },
    onConfirmPasswordChange: {
      type: "eventHandler",
      argTypes: [{ name: "event", type: "object" }],
      description: "Appelée lors de la modification du champ de confirmation du mot de passe",
    },
    onAlertClose: {
      type: "eventHandler",
      argTypes: [{ name: "id", type: "string" }],
      description: "Fonction appelée lorsqu'une alerte est fermée",
    },
  },

  // États pour la gestion du mot de passe
  states: {
    password: {
      type: "writable",
      variableType: "text",
      valueProp: "password",
      onChangeProp: "onPasswordChange",
    },
    confirmPassword: {
      type: "writable",
      variableType: "text",
      valueProp: "confirmPassword",
      onChangeProp: "onConfirmPasswordChange",
    },
  },

  importPath: "./plasmic-library/authentification/AccountParameters",
};

export default AccountParametersMeta;
