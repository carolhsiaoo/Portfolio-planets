"use client";

const WashiTape = () => {
  const tapeText =
    "• RESEARCH • DESIGN • BUILD • ITERATE ";

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        zIndex: 0,
        top: "-20%",
        left: "-20%",
        right: "-20%",
        bottom: "-20%",
      }}
    >
      {/* First strip — steep angle, through the right side */}
      <div
        className="absolute"
        style={{
          top: "5%",
          left: "60%",
          width: "120%",
          height: "44px",
          background: "rgba(59, 100, 246, 0.88)",
          transform: "rotate(40deg)",
          transformOrigin: "left center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="whitespace-nowrap animate-washi-tape"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: "3px",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
          }}
        >
          {tapeText.repeat(8)}
        </div>
      </div>

      {/* Second strip — shallower angle, from center to lower-right */}
      <div
        className="absolute"
        style={{
          top: "90%",
          left: "40%",
          width: "120%",
          height: "44px",
          background: "rgba(59, 100, 246, 0.82)",
          transform: "rotate(-30deg)",
          transformOrigin: "left center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="whitespace-nowrap animate-washi-tape-reverse"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: "3px",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
          }}
        >
          {tapeText.repeat(8)}
        </div>
      </div>
    </div>
  );
};

export default WashiTape;
