"use client";

import React from "react";

interface NXLogoProps {
    className?: string;
}

const NXLogo: React.FC<NXLogoProps> = ({ className = "h-8 w-auto" }) => {
    return (
        <svg
            viewBox="0 0 100 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FDE6D9" />
                    <stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
            </defs>
            {/* The "N" part - stylized and bold */}
            <path
                d="M10 70V10H25L45 45V10H55V70H40L20 35V70H10Z"
                fill="url(#logo-gradient)"
            />
            {/* The "X" part - interlocking with the N diagonal */}
            {/* I'll make the X slightly integrated or overlapping */}
            <path
                d="M50 40L70 10H85L60 45L85 80H70L50 50L30 80H15L40 45L15 10H30L50 40Z"
                fill="url(#logo-gradient)"
                style={{ mixBlendMode: 'plus-lighter' }}
            />
            {/* Adding some subtle highlights to give it a premium metallic feel */}
            <path
                d="M10 10H25L20 15H10V10Z"
                fill="white"
                fillOpacity="0.3"
            />
            <path
                d="M70 10H85L80 15H70V10Z"
                fill="white"
                fillOpacity="0.3"
            />
        </svg>
    );
};

export default NXLogo;
