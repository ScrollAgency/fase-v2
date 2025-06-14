'use client'

import React from 'react';
import { motion, useDragControls, useMotionValue, useAnimate } from 'framer-motion';
import useMeasure from "react-use-measure"
import styles from './Drawer.module.css';

interface DragCloserDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
  barColor: string;
  backgroundColor: string;
}

export default function DragCloseDrawer(props: DragCloserDrawerProps) {
  const { open, setOpen, className, barColor, backgroundColor, children } = props;

  const controls = useDragControls();
  const y = useMotionValue(0);
  const [scope, animate] = useAnimate();

  const [drawerRef, {height}] = useMeasure();

  controls.start

  const handleClose = async () => {
    console.log(scope.current);
    await animate(scope.current, {
      opacity: [1, 0]
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;
    
    await animate(".drag_close_drawer", {
      y: [yStart, height]
    })
    setOpen(false);
  }

  return (
    <>
      { open &&
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className={`${styles.drawer_background}`}
          style={{ backgroundColor: backgroundColor }}
        >
          <motion.div
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.2
            }}
            style={{ y }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0
            }}
            dragElastic={{
              top:0,
              bottom:0.5
            }}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            className={`${styles.drawer} ${className} drag_close_drawer`}
          >
            <button
              className={styles.closing_bar_wrapper}
              onPointerDown={(e) => {
                controls.start(e);
              }}
            >
              <div className={styles.closing_bar} style={{ backgroundColor: barColor }}></div>
            </button>
            <div className={styles.scrolling_content}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      }
    </>
  )
}