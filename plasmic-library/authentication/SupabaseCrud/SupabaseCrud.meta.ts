const SupabaseCrudMeta = {
  name: "SupabaseCrud",
  section: "📍 Utils",
  displayName: "Supabase user Crud",
  description: "Permet de réaliser les opérations de CRUD sur les users en toute sécurité",
  thumbnailUrl: "https://static1.plasmic.app/insertables/modal.svg",
  props: {
    userId: {
      type: "string",
    },
    pseudoToUpdate: {
      type: "string",
      defaultValue: ""
    },
    firstnameToUpdate: {
      type: "string",
    },
    lastnameToUpdate: {
      type: "string",
    },
    emailToUpdate: {
      type: "string",
    },
    roleToUpdate: {
      type: "string",
    },
    isOpen: {
      type: "boolean",
      defaultValue: false,
    },
    setIsOpen: {
      type: "function",
    },
    onClose: {
      type: "eventHandler",
      argTypes: [{ name: "event", type: "object" }],
    },
    action: {
      type: "choice",
      options: ["read", "create", "update", "reset", "delete"],
      defaultValue: "read",
    },
  },
  importPath: "./components/others/SupabaseCrud/SupabaseCrud",
  hideProps: ["setIsOpen"],
};

export default SupabaseCrudMeta;
