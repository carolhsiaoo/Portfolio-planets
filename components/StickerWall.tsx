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

  // Responsive sticker configurations - scattered all around the About section
  const getStickers = () => {
    if (isMobile) {
      // Mobile: scattered around the section
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -18,
          x: -130,
          y: -80,
          width: 75,
          height: 55
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 22,
          x: 120,
          y: -50,
          width: 65,
          height: 65
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -15,
          x: -110,
          y: 180,
          width: 70,
          height: 60
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 16,
          x: 115,
          y: 200,
          width: 75,
          height: 65
        }
      ];
    } else if (isTablet) {
      // Tablet: scattered around the section
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -20,
          x: -250,
          y: -100,
          width: 135,
          height: 95
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 25,
          x: 230,
          y: -80,
          width: 105,
          height: 105
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -17,
          x: -220,
          y: 220,
          width: 115,
          height: 100
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 18,
          x: 210,
          y: 240,
          width: 115,
          height: 105
        }
      ];
    } else {
      // Desktop: scattered all around the section
      return [
        {
          image: "/stickers/taiwan-island.png",
          color: "#42f566",
          rotate: -22,
          x: -380,
          y: -120,
          width: 185,
          height: 125
        },
        {
          image: "/stickers/maple-leaf.png",
          color: "#ff6b35",
          rotate: 28,
          x: 330,
          y: -90,
          width: 145,
          height: 145
        },
        {
          image: "/stickers/nuts.png",
          color: "#ffa500",
          rotate: -18,
          x: -350,
          y: 280,
          width: 155,
          height: 135
        },
        {
          image: "/stickers/aburi-logo.png",
          color: "#ff4757",
          rotate: 20,
          x: 310,
          y: 300,
          width: 155,
          height: 140
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 100
      }}
    >
      {stickers.map((sticker, index) => (
        <div
          key={index}
          style={{
            pointerEvents: "auto"
          }}
        >
          <GlassSticker {...sticker} constraintsRef={constraintsRef} />
        </div>
      ))}
    </div>
  );
};

export default StickerWall;
