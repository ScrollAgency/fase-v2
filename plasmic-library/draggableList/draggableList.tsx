import { ReactNode, useState, useEffect } from 'react';

// Client-side only component wrapper
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

interface Item {
    id: number,
    text: string
}

interface DraggableProps {
    list: Item[]
    onDrop?: (reorderedList: Item[]) => void
}

// Dynamic import for VirtualList
const VirtualListComponent = (props: DraggableProps) => {
  const [VirtualList, setVirtualList] = useState<any>(null);

  useEffect(() => {
    // Import the component only on client side
    import('react-virtual-drag-list').then((module) => {
      setVirtualList(() => module.default);
    }).catch((error) => {
      console.error('Failed to load VirtualList:', error);
    });
  }, []);

  const onDrop = (dataSource: Item[]) => {
    // dnd complete
    console.log("Drop completed, new order:", dataSource);
    
    // Call the callback function with the reordered list
    if (props.onDrop) {
      props.onDrop(dataSource);
    }
  }

  if (!VirtualList) {
    return <div>Loading VirtualList...</div>;
  }

  return (
    <VirtualList
      className="virtual-list"
      dataKey="id"
      dataSource={props.list}
      handle=".handle"
      onDrop={onDrop}
    >
      {(record: any, index: any, dataKey: any) => {
        return (
          <div key={record.id}>
            <span className="handle">{index}</span>
            {record.text}
          </div>
        )
      }}
    </VirtualList>
  );
};

const DraggableList = (props: DraggableProps) => {
  return (
    <ClientOnly>
      <VirtualListComponent list={props.list} onDrop={props.onDrop} />
    </ClientOnly>
  );
};

export default DraggableList;