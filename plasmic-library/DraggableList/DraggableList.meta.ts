const DraggableListMeta = {
    name: "DraggableList",
    section: "Other",
    displayName: "Draggable List",
    description: "Draggable List to reorder items",
    props: {
        listItems: {
            type: "array",
            required: true,
            description: '[{"id": 1, "name": "text to displayed"},{...}]'
        },
        dragIconSlot: {
            type: 'slot',
        },
        removeIconSlot: {
            type: 'slot',
        },
        itemClassName: {
            type: 'class',
            description: 'generic class',
            selectors: [
                {
                  selector: ':hover',
                  label: 'Hovered'
                },
            ]
        },
        itemDraggedClassName: {
            type: 'class',
            description: 'class when item dragged'
        },
        itemHoveredClassName: {
            type: 'class',
            description: 'class displayed while an other item is dragged over the concerned one'
        },
        onListChange: {
            type: "eventHandler",
            displayName: "Action to update the list in plasmic studio",
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