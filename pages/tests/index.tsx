import DraggableList from '@/plasmic-library/DraggableList/DraggableList';

const listItems = [
    {id: 1, content: "Item 1"},
    {id: 2, content: "Item 2"},
    {id: 3, content: "Item 3"},
    {id: 4, content: "Item 4"},
    {id: 5, content: "Item 5"}
  ]

export default function Tests() {
    return (
        <div>
        <div style={{ padding: '20px' }}>
            <DraggableList
                listItems={ listItems }
            />
        </div>
        </div>
    );
}
