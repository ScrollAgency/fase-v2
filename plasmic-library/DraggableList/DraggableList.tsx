import styles from "./DraggableList.module.css";
import { ReactEventHandler, ReactNode, useEffect, useState } from "react";

interface Item {
  id: number,
  name: string
}

interface DraggableListProps {
  listItems: Item[],
  className: string,
  dragIconSlot: ReactNode,
  removeIconSlot: ReactNode,
  itemClassName: string,
  itemDraggedClassName: string,
  itemHoveredClassName: string,
  onListChange: (items: Item[]) => void;
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

    if (hoverIndex !== null && startIndex !== null && startIndex !== hoverIndex) {
      const updatedItems = [...items];

      const [reorderedItem] = updatedItems.splice(startIndex, 1);
      
      updatedItems.splice(hoverIndex, 0, reorderedItem);
      setItems(updatedItems);

      props.onListChange(updatedItems);
    }

    setDraggingIndex(null);
    setHoverIndex(null);
  };

  const removeItem = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const updatedItems = [...items];
    const [removedItem] = updatedItems.splice(index, 1);
    setItems(updatedItems)
    props.onListChange(updatedItems)
  }

  useEffect(() => {
    setItems(props.listItems)
  }, [props.listItems])

  return (
    <div className={ `${props.className}` }>
      { items.map((item, index) => (
        <div 
          className={`
            ${ styles.item }
            ${ props.itemClassName } 
            ${ draggingIndex === index ? props.itemDraggedClassName : '' } 
            ${ hoverIndex === index ? props.itemHoveredClassName : '' }
          `}
          key={ item.id }
          draggable
          onDragStart={(event) => onDragStart(event, index)}
          onDragEnd={onDragEnd}
          onDragEnter={(event) => onDragEnter(event, index)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => onDrop()}
        >
          <div className={styles.iconWrapper}>
            { props.dragIconSlot }
          </div>
          <div className={ styles.itemText }>
            { item.name }
          </div>
          <div
            className={styles.iconWrapper}
            onClick={(event) => removeItem(event, index)}
          >
            { props.removeIconSlot }
          </div>
        </div>
      ))}
    </div>
  )
}

export default DraggableList;