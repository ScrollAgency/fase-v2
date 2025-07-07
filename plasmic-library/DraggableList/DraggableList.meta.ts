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
        },
        onDropFunction: {
            type: "eventHandler",
            displayName: "Action au drop pour réorganiser la liste",
            argTypes: [
                {
                    name: "items",
                    type: "array",
                    description: '[{ "id": 2; "content": "text 2"}, { "id": 1, "content": "text 1" }, ...]'
                }
            ],
            section: "events",
            required: true
        },
    },
    importPath: "./components/DraggableList/DraggableList",
  };
  
  export default DraggableListMeta;