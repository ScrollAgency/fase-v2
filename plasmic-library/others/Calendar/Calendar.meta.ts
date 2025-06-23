const CalendarMeta = {
    name: "Calendar",
    section: "📅 Date",
    displayName: "Calendar (Range Picker)",
    description: "Un calendrier personnalisable permettant de sélectionner une plage de dates ou une seule date, avec boutons Aujourd'hui et Ce week-end.",
    thumbnailUrl: "https://plasmic-api.agence-scroll.com/calendar.png",
    props: {
      mode: {
        type: "choice",
        options: ["range", "single"],
        defaultValue: "range",
        description: "Mode de sélection : plage de dates (range) ou date unique (single)",
      },
      value: {
        type: "object",
        hidden: () => true,
        description: "Valeur sélectionnée : {start, end} pour range ou {date} pour single (format YYYY-MM-DD)",
        defaultValue: {
          start: "2025-06-17",
          end: "2025-06-20",
          date: "2025-06-17",
        },
        propertyTypes: {
          start: "string",
          end: "string",
          date: "string",
        },
      },
      onDateChange: {
        type: "eventHandler",
        argTypes: [{ name: "value", type: "object" }],
        description: "Appelée quand l'utilisateur sélectionne une nouvelle date ou plage de dates",
      },
      className: {
        type: "string",
        description: "Classe CSS supplémentaire pour personnaliser le style",
      },
    },

    states: {
      value: {
        type: "writable",
        variableType: "object",
        valueProp: "value",
        onChangeProp: "onDateChange",
      },
    },
    importPath: "./plasmic-library/others/calendar/Calendar",
  };
  
  export default CalendarMeta;
  