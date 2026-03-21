"use client";

import React from 'react';
import Image from 'next/image';

const HeroBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] h-screen w-full overflow-hidden bg-[#050505]">
      {/* 1. The Main PNG Image Layer */}
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/image/hero-bg.png" // Extension ab .png hai
          alt="Premium Tech Background"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105" 
        />
      </div>

      {/* 2. Radial Gradient Overlay - Focus on Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#050505_90%)]" />

      {/* 3. Bottom Fade - Smooth transition to other sections */}
      <div className="absolute bottom-0 left-0 h-100 w-full bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent" />

      {/* 4. Subtle Texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};

export default HeroBackground;