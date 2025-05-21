const SitexDropDownMeta = {
  name: "SitexDropDown",
  section: "📍 Test",
  displayName: "Simple Select",
  description: "Un dropdown simple pour les formulaires.",
  thumbnailUrl: "https://static1.plasmic.app/insertables/select.svg",
  props: {
    label: {
      type: "string",
      defaultValue: "Dropdown",
      description: "Texte de l'étiquette du dropdown.",
    },
    value: {
      type: "string",
      defaultValue: "",
      description: "Valeur sélectionnée.",
    },
    options: {
      type: "array",
      description: "Liste des options disponibles dans le dropdown.",
      itemProps: {
        id: {
          type: "string",
          description: "Identifiant unique de l'option.",
        },
        label: {
          type: "string",
          description: "Libellé de l'option.",
        },
      },
    },
    onChange: {
      type: "eventHandler",
      description: "Fonction appelée lors du changement d'option.",
      argTypes: [
        {
          name: "id",
          type: "string",
        },
      ],
    },
  },
  states: {
    value: {
      type: "writable",
      variableType: "text",
      valueProp: "value",
      onChangeProp: "onChange",
    },
  },
  importPath: "./components/forms/SitexDropDown/SitexDropDown",
};

export default SitexDropDownMeta;
