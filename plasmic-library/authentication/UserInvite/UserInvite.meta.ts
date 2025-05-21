const UserInviteMeta = {
  name: "UserInvite",
  section: "🔑 Authentication",
  displayName: "User Invite",
  description: "Formulaire pour définir un mot de passe après une invitation Supabase",
  thumbnailUrl: "https://plasmic-api.agence-scroll.com/invite.png", // (remplace si besoin)
  props: {
    title: {
      type: "string",
      defaultValue: "Bienvenue",
      description: "Titre principal affiché sur le formulaire",
    },
    description: {
      type: "string",
      defaultValue: "Veuillez définir un mot de passe pour finaliser votre compte.",
      description: "Texte descriptif sous le titre",
    },

    // Password
    passwordLabel: {
      type: "string",
      defaultValue: "Mot de passe",
    },
    password: {
      type: "string",
      defaultValue: "",
      valueProp: "password",
      onChangeProp: "onPasswordChange",
    },
    placeholderPassword: {
      type: "string",
      defaultValue: "Entrez votre mot de passe",
    },

    submitButtonText: {
      type: "string",
      defaultValue: "Valider",
      description: "Texte du bouton de soumission",
    },
    successRedirectUrl: {
      type: "string",
      defaultValue: "/login",
      description: "URL de redirection après mise à jour du mot de passe",
    },
    onPasswordChange: {
      type: "eventHandler",
      argTypes: [{ name: "event", type: "object" }],
    },
  },
  states: {
    password: {
      type: "writable",
      variableType: "text",
      valueProp: "password",
      onChangeProp: "onPasswordChange",
    },
  },
  importPath: "./components/auth/UserInvite",
};

export default UserInviteMeta;
