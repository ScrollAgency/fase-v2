import styles from "./DraggableList.module.css";
import { ReactEventHandler, ReactNode, useState } from "react";

interface Item {
  id: number,
  content: string
}

interface DraggableListProps {
  listItems: Item[],
  className: string,
  children: ReactNode,
  itemClassName: string,
  onDropFunction: (items: Item[]) => void;
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

      props.onDropFunction(items);
    }

    setDraggingIndex(null);
    setHoverIndex(null);
  };  

  return (
    <div className={ `${props.className}` }>
      { items.map((item, index) => (
        <div 
          className={`
            ${ styles.item }
            ${ props.itemClassName } 
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
        >
          { props.children }
          <div className={ styles.itemText }>
            { item.content }
          </div>
        </div>
      ))}
    </div>
  )
}

export default DraggableList;