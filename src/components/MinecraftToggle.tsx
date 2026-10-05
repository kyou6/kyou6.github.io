import React, { useState } from 'react';
import buttonBg from '../assets/buttons/button.png';
import buttonHoverBg from '../assets/buttons/button_highlighted.png';
import { playPressSound, playFocusSound } from '../utils/sound';

interface MinecraftToggleProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    isSelected?: boolean;
    onSelect?: () => void;
    onLabel?: string;
    offLabel?: string;
    className?: string;
}

export const MinecraftToggle: React.FC<MinecraftToggleProps> = ({
    label,
    value,
    onChange,
    isSelected = false,
    onSelect,
    onLabel = 'ON',
    offLabel = 'OFF',
    className = '',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const isHighlighted = isHovered || isSelected;

    return (
        <button
            className={`
                w-full h-10 sm:h-12 flex items-center justify-center
                ${isHighlighted ? 'text-[#ffffa0]' : 'text-[#e0e0e0]'} text-xs sm:text-sm
                bg-no-repeat cursor-pointer font-minecraft relative
                ${className}
            `}
            style={{
                backgroundImage: `url(${isHighlighted ? buttonHoverBg : buttonBg})`,
                backgroundSize: '100% 100%',
                imageRendering: 'pixelated',
                textShadow: '2px 2px 0px #3f3f3f',
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                playFocusSound();
                onSelect?.();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                playPressSound();
                onChange(!value);
            }}
        >
            {/* Blue highlight overlay */}
            {isHighlighted && (
                <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundColor: '#4a65c2',
                        mixBlendMode: 'screen',
                        opacity: 0.65,
                    }}
                />
            )}
            <span className="relative z-10 font-bold tracking-wide">
                {label}: {value ? onLabel : offLabel}
            </span>
        </button>
    );
};
