import React from "react";

export default function OctoMaskLogo({ size = 120, color = "#38bdf8", textColor = "#ffffff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="OctoMask Logo"
    >
      {/* Cat head */}
      <path
        d="M40 30 Q42 10 55 20 Q60 25 65 20 Q78 10 80 30 Q100 40 95 65 Q90 90 60 95 Q30 90 25 65 Q20 40 40 30 Z"
        fill={color}
      />

      {/* Eyes */}
      <circle cx="50" cy="50" r="4" fill="#222" />
      <circle cx="70" cy="50" r="4" fill="#222" />

      {/* Nose */}
      <ellipse cx="60" cy="58" rx="3" ry="2" fill="#222" />

      {/* Tentacles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 42 + i * 6;
        return <path key={i} d={`M${x} 95 Q${x + 2} 105 ${x} 115`} stroke={color} strokeWidth="4" />;
      })}

      {/* Tail */}
      <path
        d="M90 70 Q110 80 95 95"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Whiskers */}
      <path d="M80 55 Q100 53 85 52" stroke={color} strokeWidth="2" opacity="0.4" />
      <path d="M80 60 Q100 60 85 61" stroke={color} strokeWidth="2" opacity="0.4" />

      {/* Mask held in left hand */}
      <g transform="translate(25, 45)">
        <rect width="25" height="35" rx="5" fill="#ffffff" stroke="#00000033" strokeWidth="1" />
        <path d="M5 15 Q10 20 15 15" stroke="#000" strokeWidth="2" fill="none" />
        <circle cx="8" cy="10" r="2" fill="#000" />
        <circle cx="17" cy="10" r="2" fill="#000" />
        <line x1="12" y1="35" x2="12" y2="55" stroke="#000" strokeWidth="2" />
      </g>

      {/* Text */}
      <text
        x="60"
        y="118"
        textAnchor="middle"
        fontSize="18"
        fill={textColor}
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        OctoMask
      </text>
    </svg>
  );
}
