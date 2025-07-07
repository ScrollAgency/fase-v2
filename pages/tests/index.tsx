import DraggableList from '@/plasmic-library/draggableList/draggableList';
import { useState } from 'react';

export default function Tests() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' }
  ]);

  const handleDrop = (reorderedList: any[]) => {
    console.log('New order received:', reorderedList);
    setItems(reorderedList);
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h2>Draggable List Test</h2>
        <p>Drag items to reorder them. The new order will be logged to console and updated in state.</p>
        
        <DraggableList 
          list={items} 
          onDrop={handleDrop}
        />
        
        <div style={{ marginTop: '20px' }}>
          <h3>Current Order:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={item.id}>
                {index + 1}. {item.text} (ID: {item.id})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
