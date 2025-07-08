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
        iconSlot: {
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