"use client";

import React from "react";
import GlassSticker from "./GlassSticker";

const StickerWall = () => {
  // Define your stickers with positions around the About section
  const stickers = [
    // Taiwan island (top left) - elongated shape
    {
      image: "/stickers/taiwan-island.png",
      color: "#42f566", // Green glow
      rotate: -15,
      x: -380,
      y: 30,
      width: 240,
      height: 160
    },
    // Maple leaf (top right) - organic leaf shape
    {
      image: "/stickers/maple-leaf.png",
      color: "#ff6b35", // Orange/red glow
      rotate: 12,
      x: 250,
      y: -50,
      width: 160,
      height: 160
    },
    // Nuts (bottom center) - clustered flower shape
    {
      image: "/stickers/nuts.png",
      color: "#ffa500", // Golden orange glow
      rotate: -8,
      x: 0,
      y: 240,
      width: 170,
      height: 150
    },
    // Aburi logo (on top of "Aburi Studio" text)
    {
      image: "/stickers/aburi-logo.png",
      color: "#ff4757", // Red/orange glow
      rotate: 8,
      x: 30,
      y: -200,
      width: 180,
      height: 160
    }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Allow clicks to pass through to content below
        zIndex: 100
      }}
    >
      {stickers.map((sticker, index) => (
        <div
          key={index}
          style={{
            pointerEvents: "auto" // Re-enable pointer events for stickers only
          }}
        >
          <GlassSticker {...sticker} />
        </div>
      ))}
    </div>
  );
};

export default StickerWall;
