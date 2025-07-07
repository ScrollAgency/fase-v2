const DraggableListMeta = {
    name: "Draggable List",
    section: "Other",
    displayName: "Draggable List",
    description: "Draggable List to reorder items",
    props: {
        listItems: {
            type: "array",
            required: true,
            description: '[{"id": 1, "content": "text to displayed"},{...}]'
        },
    },
    importPath: "./components/DraggableList/DraggableList",
  };
  
  export default DraggableListMeta;