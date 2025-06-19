const ButtonGoogleMeta = {
    name: "ButtonGoogle",
    section: "Buttons",
    displayName: "Button Google",
    description: "Google authentication button",
    thumbnailUrl: "https://static1.plasmic.app/insertables/button.svg",
    props: {
      disabled: "boolean",
      redirectTo: {
        type: "string",
        description: "slug of the page to redirect the user after authentication (without first /)",
        diplayName: "redirect slug"
      },
      children: "slot"
    },
    importPath: "./components/forms/ButtonGoogle/ButtonGoogle",
  };
  
  export default ButtonGoogleMeta;
  