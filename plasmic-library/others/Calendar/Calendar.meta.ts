const CalendarMeta = {
    name: "Calendar",
    section: "🎨 Hero",
    displayName: "Calendar",
    description: "Un calendrier avec range de date",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/calendar.png",
    props: {
      value: {
        type: "object",
        hidden: () => true,
        description: "Objet contenant start et end en string YYYY-MM-DD",
        defaultValue: {
          start: "2025-05-20",
          end: "2025-05-27",
        },
        propertyTypes: {
          start: "string",
          end: "string",
        },
      },
      showDefaultDate: {
        type: "boolean",
        defaultValue: false,
      },
      onDateChange: {
        type: "eventHandler",
        argTypes: [{ name: "range", type: "object" }],
        description: "Appelée quand l'utilisateur sélectionne une nouvelle plage de dates",
      },
      
    },

    states: {
      range: {
        type: "writable",
        variableType: "object",
        valueProp: "value",
        onChangeProp: "onDateChange",
      },
  },
    importPath: "./plasmic-library/other/Calendar",
  };
  
  export default CalendarMeta;
  