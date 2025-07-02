const CalendarShadCnMeta = {
	name: "CalendarShadCn",
	section: "📍 Utils",
	displayName: "CalendarShadCn",
	description:
		"Un calendrier ShadCn totalement customisable (plage, couleurs, labels, etc)",
	thumbnailUrl: "https://plasmic-api.agence-scroll.com/calendrier.png",
	props: {
		// Customisation couleurs et styles
		selectedColor: {
			type: "string",
			defaultValue: "#000",
			description: "Couleur de fond pour le début/fin de plage (rond noir)",
		},
		selectedTextColor: {
			type: "string",
			defaultValue: "#fff",
			description: "Couleur du texte pour le début/fin de plage",
		},
		rangeColor: {
			type: "string",
			defaultValue: "#23242a",
			description: "Couleur de fond pour l'intérieur de la plage (gris foncé)",
		},
		rangeTextColor: {
			type: "string",
			defaultValue: "#fff",
			description: "Couleur du texte pour l'intérieur de la plage",
		},
		disabledTextColor: {
			type: "string",
			defaultValue: "#d1d5db",
			description: "Couleur du texte pour les jours désactivés",
		},
		todayBorderColor: {
			type: "string",
			defaultValue: "#000",
			description: "Couleur de la bordure pour aujourd'hui",
		},
		todayTextColor: {
			type: "string",
			defaultValue: "#000",
			description: "Couleur du texte pour aujourd'hui",
		},
		monthLabelClass: {
			type: "string",
			defaultValue: "text-center text-[18px] font-semibold",
			description: "Classe CSS/Tailwind pour le label du mois",
		},
		dayLabelClass: {
			type: "string",
			defaultValue: "",
			description: "Classe CSS/Tailwind pour chaque jour",
		},
		navButtonClass: {
			type: "string",
			defaultValue: "text-black hover:text-gray-800",
			description: "Classe CSS/Tailwind pour les flèches de navigation",
		},
		showOutsideDays: {
			type: "boolean",
			defaultValue: false,
			description: "Afficher les jours hors du mois (true/false)",
		},
		// Labels et boutons
		labelToday: {
			type: "string",
			defaultValue: "Aujourd'hui",
			description: "Label pour le bouton Aujourd'hui",
		},
		labelWeekend: {
			type: "string",
			defaultValue: "Ce week-end",
			description: "Label pour le bouton Ce week-end",
		},
		showTodayButton: {
			type: "boolean",
			defaultValue: true,
			description: "Afficher le bouton Aujourd'hui",
		},
		showWeekendButton: {
			type: "boolean",
			defaultValue: true,
			description: "Afficher le bouton Ce week-end",
		},
		onTodayClick: {
			type: "eventHandler",
			description: "Callback quand on clique sur Aujourd'hui",
			argTypes: [],
		},
		onWeekendClick: {
			type: "eventHandler",
			description: "Callback quand on clique sur Ce week-end",
			argTypes: [],
		},
		// Valeurs et callbacks de sélection
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
			description:
				"Appelée quand l'utilisateur sélectionne une nouvelle plage de dates",
		},
		className: {
			type: "string",
			description: "Classe CSS supplémentaire pour personnaliser le style",
		},
		innerRangeBackgroundColor: {
			type: "string",
			defaultValue: "#414651",
			description:
				"Couleur de fond pour les dates à l'intérieur de la plage sélectionnée (hors début/fin)",
		},
		innerRangeTextColor: {
			type: "string",
			defaultValue: "#fff",
			description:
				"Couleur du texte pour les dates à l'intérieur de la plage sélectionnée (hors début/fin)",
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
	importPath: "./plasmic-library/others/CalendarShadCn",
};

export default CalendarShadCnMeta;
