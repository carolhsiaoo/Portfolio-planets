"use client";

import { useState, useEffect } from "react";
import GlassSticker from "./GlassSticker";

const StickerWall = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getStickers = () => {
    if (isMobile) {
      return [
        {
          image: "/stickers/designer-sticker.png",
          color: "#3b64f6",
          rotate: -12,
          x: -120,
          y: 120,
          width: 90,
          height: 35,
        },
        {
          image: "/stickers/canada-sticker.png",
          color: "#3b64f6",
          rotate: 15,
          x: 100,
          y: -60,
          width: 70,
          height: 70,
        },
        {
          image: "/stickers/taiwan-sticker.png",
          color: "#3b64f6",
          rotate: 10,
          x: 110,
          y: 100,
          width: 55,
          height: 75,
        },
        {
          image: "/stickers/nuts-sticker.png",
          color: "#d4a843",
          rotate: -10,
          x: -100,
          y: 200,
          width: 75,
          height: 60,
        },
        {
          image: "/stickers/research-sticker.png",
          color: "#3b64f6",
          rotate: 8,
          x: 105,
          y: 210,
          width: 65,
          height: 65,
        },
      ];
    } else if (isTablet) {
      return [
        {
          image: "/stickers/designer-sticker.png",
          color: "#3b64f6",
          rotate: -10,
          x: -240,
          y: 140,
          width: 140,
          height: 50,
        },
        {
          image: "/stickers/canada-sticker.png",
          color: "#3b64f6",
          rotate: 18,
          x: 140,
          y: -90,
          width: 110,
          height: 110,
        },
        {
          image: "/stickers/taiwan-sticker.png",
          color: "#3b64f6",
          rotate: 8,
          x: 230,
          y: 80,
          width: 85,
          height: 120,
        },
        {
          image: "/stickers/nuts-sticker.png",
          color: "#d4a843",
          rotate: -14,
          x: -200,
          y: 260,
          width: 115,
          height: 90,
        },
        {
          image: "/stickers/research-sticker.png",
          color: "#3b64f6",
          rotate: 6,
          x: 220,
          y: 250,
          width: 100,
          height: 100,
        },
      ];
    } else {
      // Desktop
      return [
        {
          image: "/stickers/designer-sticker.png",
          color: "#3b64f6",
          rotate: -8,
          x: -370,
          y: 160,
          width: 180,
          height: 65,
        },
        {
          image: "/stickers/canada-sticker.png",
          color: "#3b64f6",
          rotate: 20,
          x: 200,
          y: -110,
          width: 140,
          height: 140,
        },
        {
          image: "/stickers/taiwan-sticker.png",
          color: "#3b64f6",
          rotate: 6,
          x: 350,
          y: 100,
          width: 110,
          height: 155,
        },
        {
          image: "/stickers/nuts-sticker.png",
          color: "#d4a843",
          rotate: -16,
          x: -330,
          y: 320,
          width: 150,
          height: 120,
        },
        {
          image: "/stickers/research-sticker.png",
          color: "#3b64f6",
          rotate: 5,
          x: 340,
          y: 310,
          width: 130,
          height: 130,
        },
      ];
    }
  };

  const stickers = getStickers();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {stickers.map((sticker, index) => (
        <div key={index} style={{ pointerEvents: "auto" }}>
          <GlassSticker {...sticker} />
        </div>
      ))}
    </div>
  );
};

export default StickerWall;
