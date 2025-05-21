const JobCardMeta = {
    name: "JobCard",
    section: "🔖 Jam",
    displayName: "Job card",
    description: "Description de cette belle carte",
    thumbnailUrl: "https://static1.plasmic.app/insertables/modal.svg",
    props: {
      state: {
        type: "choice",
        defaultValue: "default",
        options: ["default", "liked", "applied", "new", "lastMin"],
        required: false,
      },
      title: "string",
      className: "string",
      city: "string",
      companyName: "string",
      logo: "imageUrl",
      onClick: {
        type: "eventHandler",
        description: "Fonction appelée lors du clic sur le bouton.",
        argTypes: [
          {
            name: "event",
            type: "object",
          },
        ],
      },
      tags: {
        type: "object",
        defaultValue: [],
      },
      customIcons: {
        type: "object",
        defaultValue: {},
      },
    },
    importPath: "./components/cards/JobCard/JobCard",
  };
  
  export default JobCardMeta;