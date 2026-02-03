import React, { useState } from 'react';
import buttonBg from '../assets/buttons/button.png';
import buttonHoverBg from '../assets/buttons/button_highlighted.png';
import buttonDisabledBg from '../assets/buttons/button_disabled.png';
import clickSound from '../assets/sound/click.mp3';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isSelected?: boolean;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({
    children,
    className,
    disabled,
    onClick,
    isSelected,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const getBackgroundImage = () => {
        if (disabled) return `url(${buttonDisabledBg})`;
        if (isHovered || isSelected) return `url(${buttonHoverBg})`;

        return `url(${buttonBg})`;
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const audio = new Audio(clickSound);
        audio.play().catch(e => console.error("Error playing click sound:", e));
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={`
                w-full h-[40px] flex items-center justify-center
                text-[#e0e0e0] hover:text-[#ffffa0] text-md pt-3
                bg-contain bg-center bg-no-repeat
                cursor-pointer disabled:cursor-not-allowed
                font-minecraft
                ${className || ''}
            `}
            style={{
                backgroundImage: getBackgroundImage(),
                imageRendering: 'pixelated', // Keep the button crisp
                textShadow: '2px 2px 0px #3f3f3f'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};
