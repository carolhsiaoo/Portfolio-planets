"use client";

import { motion } from "framer-motion";
import React, { RefObject } from "react";

interface GlassStickerProps {
  image: string;
  color?: string;
  rotate?: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  constraintsRef?: RefObject<HTMLDivElement | null>;
}

const GlassSticker = ({
  image,
  color = "#ffffff",
  rotate = 0,
  x,
  y,
  width = 180,
  height = 180,
  constraintsRef
}: GlassStickerProps) => {
  // Dynamic border radius based on size
  const borderRadius = Math.min(width, height) * 0.17;

  // Calculate initial position from center of container
  const initialX = `calc(50% + ${x}px - ${width / 2}px)`;
  const initialY = `calc(50% + ${y}px - ${height / 2}px)`;

  return (
    <div
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        zIndex: 50,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0.2}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.15 }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
        }}
      >
        <img
          src={image}
          alt="sticker"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.08))`,
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default GlassSticker;
