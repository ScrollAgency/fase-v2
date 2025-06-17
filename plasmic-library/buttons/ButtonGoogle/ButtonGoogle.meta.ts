const ButtonGoogleMeta = {
    name: "ButtonGoogle",
    section: "Buttons",
    displayName: "Button Google",
    description: "Google authentication button",
    thumbnailUrl: "https://static1.plasmic.app/insertables/button.svg",
    props: {
      label: "string",
      icon: {
        type: "choice",
        defaultValue: "none",
        options: ["start", "end", "only", "none"],
        required: false,
      },
      destructive: "boolean",
      hierarchy: {
        type: "choice",
        defaultValue: "primary",
        options: ["primary", "secondary"],
        required: false,
      },
      size: {
        type: "choice",
        defaultValue: "large",
        options: ["small", "large"],
        required: false,
      },
      state: {
        type: "choice",
        defaultValue: "default",
        options: ["default", "hover", "focused", "disabled"],
        required: false,
      },
      iconImage: "imageUrl",
      className: "string",
      redirectTo: {
        type: "string",
        description: "slug of the page to redirect the user after authentication (without first /)",
        diplayName: "redirect slug"
      }
    },
    importPath: "./components/forms/ButtonGoogle/ButtonGoogle",
  };
  
  export default ButtonGoogleMeta;
  