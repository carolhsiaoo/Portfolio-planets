"use client";

import { useState, useEffect, useRef } from "react";
import GlassSticker from "./GlassSticker";

const StickerWall = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive sticker configurations
  const getStickers = () => {
    if (isMobile) {
      // Mobile: smaller sizes, closer positions
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -15,
          x: -180,
          y: -10,
          width: 100,
          height: 70
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 12,
          x: 110,
          y: -40,
          width: 80,
          height: 80
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -8,
          x: -120,
          y: 140,
          width: 85,
          height: 75
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 8,
          x: 40,
          y: 110,
          width: 110,
          height: 80
        }
      ];
    } else if (isTablet) {
      // Tablet: medium sizes
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -15,
          x: -280,
          y: -20,
          width: 160,
          height: 110
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 12,
          x: 180,
          y: -60,
          width: 120,
          height: 120
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -8,
          x: -180,
          y: 180,
          width: 130,
          height: 110
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 8,
          x: 100,
          y: 120,
          width: 130,
          height: 115
        }
      ];
    } else {
      // Desktop: full sizes
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -15,
          x: -380,
          y: 30,
          width: 240,
          height: 160
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 12,
          x: 250,
          y: -50,
          width: 160,
          height: 160
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -8,
          x: 0,
          y: 240,
          width: 170,
          height: 150
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 8,
          x: -30,
          y: -180,
          width: 180,
          height: 160
        }
      ];
    }
  };

  const stickers = getStickers();

  return (
    <div
      ref={constraintsRef}
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
          <GlassSticker {...sticker} constraintsRef={constraintsRef} />
        </div>
      ))}
    </div>
  );
};

export default StickerWall;
