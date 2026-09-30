import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  // Generous, clearly readable dimensions
  const sizeMap = {
    sm: {
      boxClass: 'w-12 h-12 md:w-14 md:h-14',
      titleClass: 'text-xl sm:text-2xl md:text-3xl',
      subClass: 'text-[9px] sm:text-[10px] tracking-[0.25em]',
    },
    md: {
      boxClass: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20',
      titleClass: 'text-2xl sm:text-3xl md:text-4xl',
      subClass: 'text-[10px] sm:text-xs tracking-[0.25em]',
    },
    lg: {
      boxClass: 'w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24',
      titleClass: 'text-3xl sm:text-4xl md:text-5xl',
      subClass: 'text-xs sm:text-sm tracking-[0.3em]',
    },
    xl: {
      boxClass: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
      titleClass: 'text-4xl sm:text-5xl md:text-6xl',
      subClass: 'text-xs sm:text-sm tracking-[0.35em]',
    },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {/* The Official MG Emblem - High Contrast & Crisp Details */}
      <div
        className={`${current.boxClass} bg-white rounded-2xl p-2 sm:p-2.5 shadow-xl flex items-center justify-center flex-shrink-0 border-2 border-[#d4af37]/60 ring-2 ring-black/40 transition-transform duration-300 group-hover:scale-105`}
        title="Mallick Garments Official MG Logo - Men's Fashion"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Collar Crescent / Neckline */}
          <path
            d="M78 36 C90 46, 110 46, 122 36 C116 48, 84 48, 78 36 Z"
            fill="#111111"
          />

          {/* Left Shoulder / Sleeve Contour */}
          <path
            d="M50 48 C42 56, 36 68, 42 80 C50 72, 60 62, 70 52 Z"
            fill="#111111"
          />

          {/* Right Shoulder & Body Contour */}
          <path
            d="M130 48 C146 38, 162 55, 144 70 C157 85, 152 105, 140 118 C158 126, 172 138, 145 152 C115 155, 95 153, 75 145 C115 140, 145 130, 128 112 C138 100, 140 85, 124 72 C132 64, 128 56, 118 50 Z"
            fill="#111111"
          />

          {/* Dynamic Flow Line 1 (Red / Crimson) with Endpoint Dot */}
          <path
            d="M62 144 C58 118, 70 88, 112 66"
            stroke="#E11D48"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="116" cy="63" r="7.5" fill="#E11D48" />

          {/* Dynamic Flow Line 2 (Teal / Emerald) with Endpoint Dot */}
          <path
            d="M70 147 C66 126, 80 102, 110 85"
            stroke="#0D9488"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="114" cy="82" r="7" fill="#0D9488" />

          {/* Dynamic Flow Line 3 (Amber / Golden Yellow) with Endpoint Dot */}
          <path
            d="M78 150 C76 134, 88 118, 108 103"
            stroke="#F59E0B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="112" cy="100" r="6.5" fill="#F59E0B" />

          {/* Extra Bold & Highly Legible Official "MG" Wordmark */}
          <text
            x="100"
            y="185"
            textAnchor="middle"
            fontFamily="'Oswald', 'Montserrat', sans-serif"
            fontWeight="900"
            fontSize="48"
            fill="#09090b"
            letterSpacing="3"
          >
            MG
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-editorial ${current.titleClass} tracking-wide text-white font-extrabold group-hover:text-[#d4af37] transition-colors leading-none`}
            >
              MALLICK GARMENTS
            </span>
          </div>
          <span
            className={`${current.subClass} uppercase font-bold text-[#d4af37] mt-1 tracking-wider leading-none`}
          >
            Bokaro Steel City · Men's Wear
          </span>
        </div>
      )}
    </div>
  );
};
