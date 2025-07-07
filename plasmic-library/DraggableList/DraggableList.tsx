import styles from "./DraggableList.module.css";
import { ReactEventHandler, useState } from "react";

interface Item {
  id: number,
  content: string
}

interface DraggableListProps {
  listItems: Item[]
}

function DraggableList(props: DraggableListProps) {
  const [items, setItems] = useState(props.listItems);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    setHoverIndex(index);
  };

  const onDragEnd = () => {
    setDraggingIndex(null);
    setHoverIndex(null);
  }

  const onDrop = () => {
    const startIndex = draggingIndex;
    if (hoverIndex && startIndex && startIndex !== hoverIndex) {
      const updatedItems = [...items];
      const [reorderedItem] = updatedItems.splice(startIndex, 1);
      updatedItems.splice(hoverIndex, 0, reorderedItem);
      setItems(updatedItems);
    }

    setDraggingIndex(null);
    setHoverIndex(null);
  };  

  return (
    <div className={ styles.container }>
      <h2>Draggable list</h2>
      { items.map((item, index) => (
        <div 
          className={`
            ${styles.item} 
            ${draggingIndex === index ? styles.dragging : ''} 
            ${hoverIndex === index ? styles.hovered : ''}
          `}
          key={ item.id }
          draggable
          onDragStart={(event) => onDragStart(event, index)}
          onDragEnd={onDragEnd}
          onDragEnter={(event) => onDragEnter(event, index)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => onDrop()}
        >{ item.content }</div>
      ))}
    </div>
  )
}

export default DraggableList;