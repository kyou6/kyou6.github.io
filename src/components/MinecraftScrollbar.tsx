import React, { useRef, useEffect, useState, useCallback } from 'react';
import scrollArrowImg from '../assets/ui/icons/scroll_arrow.png';

interface MinecraftScrollbarProps {
    children: React.ReactNode;
    /** Extra classes for the outer wrapper (e.g. height/flex constraints) */
    className?: string;
    style?: React.CSSProperties;
    /** Padding for the scrollable content area */
    contentClassName?: string;
    scrollRef?: React.RefObject<HTMLDivElement | null>;
    /** Whether to always display the scrollbar rail/track (default: true) */
    alwaysShow?: boolean;
}

const RAIL_WIDTH = 26; // px
const TRACK_WIDTH = 18; // px
const THUMB_HEIGHT = 26; // px

export const MinecraftScrollbar: React.FC<MinecraftScrollbarProps> = ({
    children,
    className = '',
    style,
    contentClassName = '',
    scrollRef: externalRef,
    alwaysShow = true,
}) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const scrollRef = (externalRef ?? internalRef) as React.RefObject<HTMLDivElement>;

    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const dragStartScrollTop = useRef(0);

    const [thumbTop, setThumbTop] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const updateMetrics = useCallback(() => {
        const el = scrollRef.current;
        const track = trackRef.current;
        if (!el) return;

        const scrollable = el.scrollHeight > el.clientHeight + 2;
        setIsScrollable(scrollable);

        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
        setCanScrollDown(scrollable && !atBottom);

        if (!track) return;
        const trackH = track.clientHeight;
        if (trackH <= 0) return;

        if (!scrollable) {
            setThumbTop(0);
            return;
        }

        const maxTop = Math.max(0, trackH - THUMB_HEIGHT);
        const scrollMax = el.scrollHeight - el.clientHeight;
        const scrollRatio = scrollMax > 0 ? el.scrollTop / scrollMax : 0;
        setThumbTop(Math.round(scrollRatio * maxTop));
    }, [scrollRef]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const raf = requestAnimationFrame(() => updateMetrics());

        el.addEventListener('scroll', updateMetrics, { passive: true });
        const ro = new ResizeObserver(() => requestAnimationFrame(updateMetrics));
        ro.observe(el);

        const mo = new MutationObserver(() => requestAnimationFrame(updateMetrics));
        mo.observe(el, { childList: true, subtree: true });

        // Update on window resize as well
        window.addEventListener('resize', updateMetrics);

        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('scroll', updateMetrics);
            ro.disconnect();
            mo.disconnect();
            window.removeEventListener('resize', updateMetrics);
        };
    }, [scrollRef, updateMetrics]);

    const scrollByPx = (delta: number) => {
        scrollRef.current?.scrollBy({ top: delta, behavior: 'smooth' });
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        const el = scrollRef.current;
        if (!track || !el) return;

        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const trackH = track.clientHeight;
        const maxTop = Math.max(1, trackH - THUMB_HEIGHT);
        const targetTop = Math.max(0, Math.min(maxTop, clickY - THUMB_HEIGHT / 2));
        const ratio = targetTop / maxTop;

        el.scrollTo({
            top: ratio * (el.scrollHeight - el.clientHeight),
            behavior: 'smooth',
        });
    };

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging.current = true;
        dragStartY.current = e.clientY;
        dragStartScrollTop.current = scrollRef.current?.scrollTop ?? 0;

        const onMove = (ev: MouseEvent) => {
            if (!isDragging.current || !scrollRef.current || !trackRef.current) return;
            const delta = ev.clientY - dragStartY.current;
            const el = scrollRef.current;
            const track = trackRef.current;
            const scrollRange = el.scrollHeight - el.clientHeight;
            const maxTop = track.clientHeight - THUMB_HEIGHT;
            if (maxTop <= 0 || scrollRange <= 0) return;

            el.scrollTop = dragStartScrollTop.current + (delta / maxTop) * scrollRange;
        };

        const onUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    const showScrollbar = alwaysShow || isScrollable;

    return (
        <div
            className={`relative overflow-hidden w-full h-full ${className}`}
            style={style}
        >
            {/* Scrollable content container */}
            <div
                ref={scrollRef as React.RefObject<HTMLDivElement>}
                className={`absolute inset-0 overflow-y-auto custom-scrollbar ${contentClassName}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    paddingRight: showScrollbar ? RAIL_WIDTH + 8 : undefined,
                } as React.CSSProperties}
            >
                {children}
            </div>

            {/* Minecraft Console Edition Scrollbar Rail */}
            {showScrollbar && (
                <div
                    className="absolute top-2 bottom-2 right-2 flex flex-col items-center select-none z-10"
                    style={{
                        width: RAIL_WIDTH,
                        backgroundColor: '#c6c6c6',
                        padding: '4px 0 6px 0',
                    }}
                >
                    {/* Recessed Track */}
                    <div
                        ref={trackRef}
                        className="flex-1 relative cursor-pointer"
                        style={{
                            width: TRACK_WIDTH,
                            backgroundColor: '#c4c4c4',
                            boxShadow: 'inset 2px 2px 0px 0px #4a4a4a, inset -2px -2px 0px 0px #ffffff',
                        }}
                        onClick={handleTrackClick}
                    >
                        {/* Rounded Pixel Thumb Knob */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: `${thumbTop}px`,
                                width: '24px',
                                height: `${THUMB_HEIGHT}px`,
                                backgroundColor: '#e0e0e0',
                                border: '2px solid #1e1e1e',
                                borderRadius: '4px',
                                boxShadow: 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #666666',
                                cursor: isScrollable ? 'grab' : 'default',
                                zIndex: 2,
                            }}
                            onMouseDown={isScrollable ? handleThumbMouseDown : undefined}
                        />
                    </div>

                    {/* Small vertical gap between track and arrow */}
                    <div style={{ height: '6px' }} />

                    {/* Yellow Down Arrow (Pixelated) */}
                    <div
                        className={`shrink-0 flex items-center justify-center transition-opacity duration-150 ${
                            canScrollDown ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
                        }`}
                        style={{
                            width: RAIL_WIDTH,
                            height: '12px',
                        }}
                        onClick={() => scrollByPx(70)}
                        title="Scroll down"
                    >
                        <img
                            src={scrollArrowImg}
                            alt="Scroll down"
                            style={{
                                width: '15px',
                                height: '9px',
                                imageRendering: 'pixelated',
                            }}
                            draggable={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
