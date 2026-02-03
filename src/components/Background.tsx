import React, { useEffect, useState } from 'react';
import dayBg from '../assets/background/day.png';
import nightBg from '../assets/background/night.png';

export const Background: React.FC = () => {
    const [nightOpacity, setNightOpacity] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hour = now.getHours() + now.getMinutes() / 60;

            let opacity = 0;
            if (hour >= 19 || hour < 6) {
                opacity = 1; // Night
            } else if (hour >= 8 && hour < 17) {
                opacity = 0; // Day
            } else if (hour >= 6 && hour < 8) {
                // Sunrise: 6:00 -> Night (1), 8:00 -> Day (0)
                opacity = 1 - (hour - 6) / 2;
            } else if (hour >= 17 && hour < 19) {
                // Sunset: 17:00 -> Day (0), 19:00 -> Night (1)
                opacity = (hour - 17) / 2;
            }
            setNightOpacity(Math.max(0, Math.min(1, opacity)));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-cover bg-center animate-pan-slow z-[-2]" style={{ backgroundImage: `url(${dayBg})` }} />
            <div
                className="fixed inset-0 bg-cover bg-center animate-pan-slow z-[-2]"
                style={{
                    backgroundImage: `url(${nightBg})`,
                    opacity: nightOpacity,
                    transition: 'opacity 5s ease-in-out'
                }}
            />
            {/* Overlay Gradient for readability (optional style from Console Edition) */}
            <div className="fixed inset-0 bg-black/20 z-[-1] pointer-events-none" />
        </>
    );
};
