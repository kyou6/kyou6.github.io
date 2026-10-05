import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import crossBtn from '../assets/ui/xbox/ButtonA.png';
import circleBtn from '../assets/ui/xbox/ButtonB.png';
import { playPressSound, playBackSound, playScrollSound } from '../utils/sound';

import gmailIcon from '../assets/social/gmail.png';
import githubIcon from '../assets/social/github.png';
import linkedinIcon from '../assets/social/linkedin.png';
import facebookIcon from '../assets/social/facebook.png';
import instagramIcon from '../assets/social/instagram.png';
import youtubeIcon from '../assets/social/youtube.png';

export const Social: React.FC = () => {
    const navigate = useNavigate();
    const tabs = ['Social'];
    const [selectedTab, setSelectedTab] = useState('Social');
    const [selectedOption, setSelectedOption] = useState(0);

    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const socialOptions = [
        { label: "Gmail", color: "#EA4335", path: "mailto:carldominiquecruz@gmail.com", image: gmailIcon },
        { label: "Github", color: "#24292E", path: "https://github.com/kyou6", image: githubIcon },
        { label: "LinkedIn", color: "#0A66C2", path: "https://www.linkedin.com/in/carlsugatan/", image: linkedinIcon },
        { label: "Facebook", color: "#1877F2", path: "https://www.facebook.com/csugatan/", image: facebookIcon },
        { label: "Instagram", color: "#E4405F", path: "https://www.instagram.com/ryou.mc/", image: instagramIcon },
        { label: "Youtube", color: "#FF0000", path: "https://www.youtube.com/@csugatan", image: youtubeIcon }
    ];

    const handleOpenOption = useCallback((option: { path: string }) => {
        playPressSound();
        setTimeout(() => {
            if (option.path.startsWith('mailto:')) {
                window.location.href = option.path;
            } else if (option.path.startsWith('http://') || option.path.startsWith('https://')) {
                window.open(option.path, '_blank');
            } else {
                navigate(option.path);
            }
        }, 120);
    }, [navigate]);

    // Handle Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (socialOptions.length > 0) {
                    playScrollSound();
                    setSelectedOption(prev => (prev > 0 ? prev - 1 : socialOptions.length - 1));
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (socialOptions.length > 0) {
                    playScrollSound();
                    setSelectedOption(prev => (prev < socialOptions.length - 1 ? prev + 1 : 0));
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (socialOptions[selectedOption]) {
                    handleOpenOption(socialOptions[selectedOption]);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                playBackSound();
                navigate('/');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [socialOptions, selectedOption, handleOpenOption, navigate]);

    // Scroll active item into view
    useEffect(() => {
        const el = itemRefs.current[selectedOption];
        if (el) {
            el.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }, [selectedOption]);

    return (
        <div className="flex items-center justify-center w-full h-dvh font-minecraft p-2 sm:p-4 overflow-hidden select-none">
            <div className="relative w-full max-w-200 flex flex-col h-full max-h-[96dvh] sm:max-h-[90vh] justify-center">

                {/* Tabs */}
                <div className="relative flex w-full translate-y-2.5 z-10 items-end gap-1">
                    {tabs.map((tab) => {
                        const isActive = selectedTab === tab;
                        return (
                            <div
                                key={tab}
                                className="flex-1"
                                style={{
                                    height: isActive ? 'clamp(54px, 8vh, 70px)' : 'clamp(48px, 7vh, 64px)',
                                    filter: 'drop-shadow(0 -4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)',
                                    zIndex: isActive ? 20 : 0,
                                }}
                            >
                                <div
                                    className={`p-1 sm:p-2 w-full h-full text-center text-sm sm:text-md cursor-pointer relative pixel-corners-t ${isActive
                                        ? 'bg-[#c6c6c6] text-[#474747]'
                                        : 'bg-[#8d8d8d] text-[#474747] hover:bg-[#9d9d9d]'
                                        }`}
                                    style={{
                                        boxShadow: isActive
                                            ? 'inset 6px 6px 0px 0px #ffffff, inset -6px 0px 0px 0px #555555'
                                            : 'inset 6px 6px 0px 0px #aaaaaa, inset -6px 0px 0px 0px #555555',
                                    }}
                                    onClick={() => {
                                        playPressSound();
                                        setSelectedTab(tab);
                                    }}
                                >
                                    <div className={`text-sm sm:text-md font-bold pt-2 sm:pt-4 ${isActive ? 'mt-2 sm:mt-3' : 'mt-1 sm:mt-2'}`}>
                                        {tab}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Box */}
                <div
                    className="relative w-full flex-1 sm:flex-none sm:h-160 flex flex-col z-0 min-h-0"
                    style={{ filter: 'drop-shadow(0 4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)' }}
                >
                    <div
                        className="relative bg-[#c6c6c6] flex flex-col h-full z-0 pixel-corners overflow-hidden"
                        style={{
                            boxShadow: 'inset 6px 6px 0px 0px #ffffff, inset -6px -6px 0px 0px #555555',
                        }}
                    >
                        <div className="flex flex-col h-full p-2 sm:p-4 min-h-0">
                            {/* Inner List Container */}
                            <div
                                ref={scrollContainerRef}
                                className="flex-1 bg-[#8b8b8b] mt-1 sm:mt-2 mb-1 sm:mb-2 overflow-y-auto custom-scrollbar relative pt-2 sm:pt-4 pb-6 min-h-0 rounded-none"
                                style={{
                                    boxShadow: `
                                    inset 6px 6px 0px 0px #373737,
                                    inset -6px -6px 0px 0px #ffffff
                                `
                                }}
                            >
                                <div className="space-y-1.5 sm:space-y-2 p-2 sm:p-4 pb-8">
                                    {socialOptions.map((option, index) => {
                                        const isSelected = selectedOption === index;
                                        return (
                                            <MinecraftButton
                                                key={`${option.label}-${index}`}
                                                ref={(el) => { itemRefs.current[index] = el; }}
                                                isSelected={isSelected}
                                                className="h-12! sm:h-14! md:h-16! px-3 sm:px-6 md:pl-12 transition-transform shrink-0"
                                                onMouseEnter={() => {
                                                    setSelectedOption(index);
                                                }}
                                                onClick={() => {
                                                    setSelectedOption(index);
                                                    handleOpenOption(option);
                                                }}
                                            >
                                                <div className="flex items-center gap-3 sm:gap-6 w-full h-full">
                                                    {option.image ? (
                                                        <img
                                                            src={option.image}
                                                            alt={option.label}
                                                            className={`w-7 h-7 sm:w-9 sm:h-9 shrink-0 border-2 border-black bg-white ${option.image.toLowerCase().endsWith('.png')}`}
                                                            style={{ imageRendering: 'pixelated', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-black shrink-0" style={{ backgroundColor: option.color }} />
                                                    )}
                                                    <span className="text-sm sm:text-lg md:text-xl text-left leading-none py-2 truncate">{option.label}</span>
                                                </div>
                                            </MinecraftButton>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex gap-4 sm:gap-8 mt-2 sm:mt-4 text-sm sm:text-xl text-white justify-center sm:justify-start">
                    <div className="flex items-center gap-2 sm:gap-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                        <img src={crossBtn} alt="Select" className="w-5 h-5 sm:w-8 sm:h-8 pixelated" />
                        <span className="tracking-wide">Select</span>
                    </div>
                    <div
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:brightness-110"
                        onClick={() => {
                            playBackSound();
                            navigate('/');
                        }}
                    >
                        <img src={circleBtn} alt="Back" className="w-5 h-5 sm:w-8 sm:h-8 pixelated" />
                        <span className="tracking-wide">Back</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
