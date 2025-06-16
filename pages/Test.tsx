import React, { useState } from 'react';
import DragCloseDrawer from '../plasmic-library/cards/Drawer/Drawer';

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Open Drawer
      </button>

      <DragCloseDrawer
        open={isOpen}
        setOpen={setIsOpen}
        barColor="#007bff"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <div style={{ padding: '20px' }}>
          <h2>Drawer Content</h2>
          <p>This is some sample content in the drawer.</p>
          <p>You can put any content here.</p>
          <div style={{ height: '1000px', background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)' }}>
            <p>Scrollable content area</p>
            <p>Try scrolling to see the drawer behavior</p>
          </div>
        </div>
      </DragCloseDrawer>
    </div>
  );
} 