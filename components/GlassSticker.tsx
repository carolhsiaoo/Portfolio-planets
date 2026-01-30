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
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.2}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 100 }}
      initial={{ rotate }}
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        zIndex: 50,
        width: `${width}px`,
        height: `${height}px`,
        cursor: "grab",
        rotate: rotate
      }}
    >
      {/* Sticker image with colored glow */}
      <img
        src={image}
        alt="sticker"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: `drop-shadow(0 8px 16px rgba(0,0,0,0.15)) drop-shadow(0 0 30px ${color}80)`,
          pointerEvents: "none",
          userSelect: "none"
        }}
        draggable={false}
      />
    </motion.div>
  );
};

export default GlassSticker;
