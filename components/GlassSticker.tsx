"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

interface GlassStickerProps {
  image: string;
  color?: string;
  rotate?: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

const GlassSticker = ({
  image,
  color = "#ffffff",
  rotate = 0,
  x,
  y,
  width = 180,
  height = 180
}: GlassStickerProps) => {
  // Dynamic border radius based on size
  const borderRadius = Math.min(width, height) * 0.17;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 100 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: x,
        y: y,
        rotate: rotate,
        zIndex: 50,
        width: `${width}px`,
        height: `${height}px`,
        cursor: "grab"
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
