import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import logo from '../assets/ui/icons/logo.png';
import crossBtn from '../assets/ui/ps4/ps4_face_button_down.png';
import circleBtn from '../assets/ui/ps4/ps4_face_button_right.png';
import { playPressSound, playBackSound, playScrollSound } from '../utils/sound';
import splashRaw from '../components/Splash.txt?raw';

export interface MenuItem {
    label: string;
    action: () => void;
}

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [splashText, setSplashText] = useState<string>("Welcome");

    useEffect(() => {
        const lines = splashRaw
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length > 0) {
            const randomIndex = Math.floor(Math.random() * lines.length);
            setSplashText(lines[randomIndex]);
        }
    }, []);

    const menuItems: MenuItem[] = useMemo(() => [
        { label: "Start", action: () => navigate('/world') },
        { label: "Statistics", action: () => navigate('/statistics') },
        { label: "Github", action: () => window.open("https://github.com/kyou6", "_blank") },
        { label: "Help and Options", action: () => navigate('/settings/video') },
        { label: "Exit", action: () => window.close() },
    ], [navigate]);

    useEffect(() => {
        document.title = "Minecraft Dashboard";
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedOption(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
                playScrollSound();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedOption(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
                playScrollSound();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                playPressSound();
                menuItems[selectedOption]?.action();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                playBackSound();
                window.close();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedOption, menuItems]);

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center font-minecraft">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-350 px-4">
                {/* Logo Section */}
                <div className="relative mb-8 sm:mb-12 md:mb-16 text-center z-10 flex flex-col items-center scale-90 sm:scale-100 transition-transform duration-300">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="My Portfolio Logo"
                            className="max-w-150 md:max-w-200 lg:max-w-250 w-[90vw] pixelated drop-shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
                        />
                        {/* Splash Text */}
                        <div className="absolute -bottom-4 -right-2 sm:bottom-0 sm:-right-8 md:bottom-8 md:-right-16 text-[#ebeb00] text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] drop-shadow-[3px_3px_0px_#3a3a00] animate-pulse-fast whitespace-nowrap z-20 -rotate-5 origin-center">
                            {splashText}
                        </div>
                    </div>
                </div>

                {/* Menu Buttons */}
                <div className="flex flex-col gap-3 w-[85vw] sm:w-150 md:w-175 lg:w-200 z-10 mt-4 md:mt-8">
                    {menuItems.map((item, index) => (
                        <MinecraftButton
                            key={item.label}
                            isSelected={selectedOption === index}
                            className="h-12 sm:h-14 md:h-16 text-sm sm:text-md md:text-lg text-center"
                            onMouseEnter={() => {
                                setSelectedOption(index);
                            }}
                            onClick={() => {
                                setSelectedOption(index);
                                item.action();
                            }}
                        >
                            {item.label}
                        </MinecraftButton>
                    ))}
                </div>
            </div>

            {/* Footer Control Hints */}
            <div className="w-full p-6 z-20 flex justify-between items-end pb-4 sm:pb-8 px-8 sm:px-16 text-white text-xl sm:text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] absolute bottom-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <img src={crossBtn} alt="Select" className="w-8 h-8 sm:w-10 sm:h-10 pixelated" />
                        <span className="tracking-wide">Select</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={circleBtn} alt="Exit" className="w-8 h-8 sm:w-10 sm:h-10 pixelated" />
                        <span className="tracking-wide">Exit</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
