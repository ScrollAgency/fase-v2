const DraggableListMeta = {
    name: "DraggableList",
    section: "Other",
    displayName: "Draggable List",
    description: "Draggable List to reorder items",
    props: {
        listItems: {
            type: "array",
            required: true,
            description: '[{"id": 1, "content": "text to displayed"},{...}]'
        },
        children: {
            type: 'slot',
        },
        itemClassName: {
            type: 'class',
            selectors: [
                // Plasmic Studio user can also in addition style the button's
                // hovered and pressed state
                {
                  selector: ':hover',
                  label: 'Hovered'
                },
            ]
        }
    },
    importPath: "./components/DraggableList/DraggableList",
  };
  
  export default DraggableListMeta;