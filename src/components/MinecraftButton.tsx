import React, { useState } from 'react';
import buttonBg from '../assets/buttons/button.png';
import buttonHoverBg from '../assets/buttons/button_highlighted.png';
import buttonDisabledBg from '../assets/buttons/button_disabled.png';
import { playPressSound, playFocusSound } from '../utils/sound';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isSelected?: boolean;
}

export const MinecraftButton = React.forwardRef<HTMLButtonElement, MinecraftButtonProps>(({
    children,
    className,
    disabled,
    onClick,
    onMouseEnter,
    isSelected,
    ...props
}, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const getBackgroundImage = () => {
        if (disabled) return `url(${buttonDisabledBg})`;
        if (isHovered || isSelected) return `url(${buttonHoverBg})`;

        return `url(${buttonBg})`;
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        playPressSound();
        if (onClick) {
            onClick(event);
        }
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        playFocusSound();
        if (onMouseEnter) {
            onMouseEnter(event);
        }
    };

    const hasHeight = className?.split(' ').some(c => c.startsWith('h-') || c.startsWith('max-h-') || c.startsWith('min-h-'));
    const isHighlighted = !disabled && (isHovered || isSelected);

    return (
        <button
            ref={ref}
            className={`
                w-full ${hasHeight ? '' : 'h-10'} flex items-center justify-center
                ${isHighlighted ? 'text-[#ffffa0]' : 'text-[#e0e0e0]'} hover:text-[#ffffa0] text-md
                bg-no-repeat
                cursor-pointer disabled:cursor-not-allowed
                font-minecraft relative
                ${className || ''}
            `}
            style={{
                backgroundImage: getBackgroundImage(),
                backgroundSize: '100% 100%',
                imageRendering: 'pixelated', // Keep the button crisp
                textShadow: '2px 2px 0px #3f3f3f'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            onClick={handleClick}
            {...props}
        >
            {/* Legacy Console blue highlight overlay without modifying original texture assets */}
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
            <span className="relative z-10 w-full h-full flex items-center justify-center text-center [[class*='justify-start']>&]:justify-start [[class*='justify-start']>&]:text-left [[class*='gap-']>&]:gap-[inherit]">
                {children}
            </span>
        </button>
    );
});
