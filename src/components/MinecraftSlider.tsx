import React, { useRef, useCallback } from 'react';
import { playScrollSound } from '../utils/sound';

interface MinecraftSliderProps {
    label: string;
    value: number; // 0 to 1
    onChange: (value: number) => void;
    isSelected?: boolean;
    onSelect?: () => void;
    className?: string;
    formatValue?: (value: number) => string;
}

export const MinecraftSlider: React.FC<MinecraftSliderProps> = ({
    label,
    value,
    onChange,
    isSelected = false,
    onSelect,
    className = '',
    formatValue,
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const percent = Math.round(value * 100);
    const displayValue = formatValue
        ? formatValue(value)
        : percent === 0
        ? 'OFF'
        : `${percent}%`;

    const handleUpdate = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const raw = clampedX / rect.width;
        // Step to nearest 5%
        const stepped = Math.round(raw * 20) / 20;
        const finalVal = Math.max(0, Math.min(1, stepped));
        if (finalVal !== value) {
            playScrollSound();
            onChange(finalVal);
        }
    }, [onChange, value]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        onSelect?.();
        isDragging.current = true;
        handleUpdate(e.clientX);

        const onMouseMove = (ev: MouseEvent) => {
            if (isDragging.current) {
                handleUpdate(ev.clientX);
            }
        };

        const onMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={trackRef}
            onClick={(e) => {
                onSelect?.();
                handleUpdate(e.clientX);
            }}
            onMouseEnter={onSelect}
            className={`
                relative w-full h-10 sm:h-12 cursor-pointer select-none flex items-center justify-center font-minecraft transition-all
                ${className}
            `}
            style={{
                backgroundColor: '#3c3c3c',
                border: isSelected ? '2px solid #ffffff' : '2px solid #1a1a1a',
                boxShadow: isSelected
                    ? 'inset 2px 2px 0px #1a1a1a, inset -2px -2px 0px #5a5a5a, 0 0 6px 1px #ffffa0'
                    : 'inset 2px 2px 0px #1a1a1a, inset -2px -2px 0px #5a5a5a',
            }}
        >
            {/* Slider Track Fill / Handle */}
            <div
                className="absolute top-0.5 bottom-0.5"
                style={{
                    left: 2,
                    right: 2,
                }}
            >
                {/* Draggable Knob */}
                <div
                    onMouseDown={handleMouseDown}
                    className="absolute top-0 bottom-0"
                    style={{
                        left: `calc(${value * 100}% - ${value * 16}px)`,
                        width: '16px',
                        backgroundColor: '#c6c6c6',
                        border: '2px solid #1a1a1a',
                        boxShadow: 'inset 2px 2px 0px #ffffff, inset -2px -2px 0px #555555',
                        cursor: 'grab',
                    }}
                />
            </div>

            {/* Slider Center Text */}
            <span
                className={`
                    relative z-10 text-xs sm:text-sm font-bold tracking-wide pointer-events-none drop-shadow-[2px_2px_0px_#000000]
                    ${isSelected ? 'text-[#ffffa0]' : 'text-white'}
                `}
            >
                {label}: {displayValue}
            </span>
        </div>
    );
};
