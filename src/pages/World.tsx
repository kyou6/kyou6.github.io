import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import crossBtn from '../assets/ui/ps4/ps4_face_button_down.png';
import circleBtn from '../assets/ui/ps4/ps4_face_button_right.png';
import bumperLeft from '../assets/ui/ps4/ps4_bumper_left.png';
import bumperRight from '../assets/ui/ps4/ps4_bumper_right.png';
import { playPressSound, playBackSound, playScrollSound } from '../utils/sound';

// Map programming languages to colors (GitHub-style)
const languageColors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3572A5',
    'C++': '#F34B7D',
    C: '#555555',
    Java: '#B07219',
    HTML: '#E34C26',
    CSS: '#563D7C',
    Shell: '#89E051',
    Rust: '#DEA584',
    Go: '#00ADD8',
};

export const World: React.FC = () => {
    const navigate = useNavigate();
    const tabs = ['Load', 'Social', 'Repository'];
    const [selectedTab, setSelectedTab] = useState('Load');
    const [selectedOption, setSelectedOption] = useState(0);
    const [repos, setRepos] = useState<Array<{ label: string; color: string; path: string; image?: string }>>([]);

    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch('https://api.github.com/users/kyou6/repos?sort=updated&per_page=100')
            .then(res => res.json())
            .then((data: Array<{ name: string; html_url: string; language: string | null; owner: { avatar_url: string } }>) => {
                const repoOptions = data.map(repo => ({
                    label: repo.name,
                    color: languageColors[repo.language || ''] || '#8B8B8B',
                    path: repo.html_url,
                    image: repo.owner?.avatar_url || '',
                }));
                setRepos(repoOptions);
            })
            .catch(err => console.error('Failed to fetch repos:', err));
    }, []);

    const tabOptions: Record<string, Array<{ label: string; color: string; path: string; image?: string }>> = {
        Load: [
            { label: "Introduction", color: "#4A8F28", path: "/world/load/introduction", image: "https://ccvaults.com/assets/60.%20Interface/30.%20Icons/Icon_Language.png" },
            { label: "Educational Background", color: "#C68E42", path: "/world/load/educational-background", image: "https://ccvaults.com/assets/10.%20Items/18.%20Consumables/Writable_Book.png" },
            { label: "Achievements", color: "#3C44AA", path: "/world/load/achievements", image: "https://ccvaults.com/assets/10.%20Items/10.%20Food/Cake.png" },
            { label: "Resume", color: "#B22222", path: "/world/load/resume", image: "" }
        ],
        Social: [
            { label: "Facebook", color: "#3B5998", path: "/world/social/facebook", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCoCKdsBj8rLsT_3sweQjXBNQhJu6yfwNJSnTtWo4chbUkNAbPje0fLwy&s=10" },
            { label: "Instagram", color: "#E1306C", path: "/world/social/instagram", image: "https://dinopixel.com/preload/0123/pixel-art-1673693857.png" },
            { label: "Youtube", color: "#FF0000", path: "/world/social/youtube", image: "https://cdn.dribbble.com/userupload/21926954/file/original-5837a8ca4c52399c9d90127309036631.jpg" }
        ],
        Repository: repos
    };

    const options = tabOptions[selectedTab] || [];

    const handleTabChange = useCallback((direction: 'next' | 'prev' | string) => {
        let newTab = selectedTab;
        if (direction === 'next') {
            const idx = tabs.indexOf(selectedTab);
            newTab = tabs[(idx + 1) % tabs.length];
        } else if (direction === 'prev') {
            const idx = tabs.indexOf(selectedTab);
            newTab = tabs[(idx - 1 + tabs.length) % tabs.length];
        } else if (tabs.includes(direction)) {
            newTab = direction;
        }

        if (newTab !== selectedTab) {
            playPressSound();
            setSelectedTab(newTab);
            setSelectedOption(0);
        }
    }, [selectedTab, tabs]);

    const handleOpenOption = useCallback((option: { path: string }) => {
        playPressSound();
        setTimeout(() => {
            if (option.path.startsWith('http://') || option.path.startsWith('https://')) {
                window.open(option.path, '_blank');
            } else {
                navigate(option.path);
            }
        }, 120);
    }, [navigate]);

    // Handle Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handleTabChange('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleTabChange('next');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (options.length > 0) {
                    playScrollSound();
                    setSelectedOption(prev => (prev > 0 ? prev - 1 : options.length - 1));
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (options.length > 0) {
                    playScrollSound();
                    setSelectedOption(prev => (prev < options.length - 1 ? prev + 1 : 0));
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (options[selectedOption]) {
                    handleOpenOption(options[selectedOption]);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                playBackSound();
                navigate('/');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, selectedOption, handleTabChange, handleOpenOption, navigate]);

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

    // Reset container scroll to top when tab switches
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [selectedTab]);

    // Ensure selectedOption remains within bounds
    useEffect(() => {
        if (selectedOption >= options.length && options.length > 0) {
            setSelectedOption(0);
        }
    }, [options.length, selectedOption]);

    return (
        <div className="flex items-center justify-center w-full h-dvh font-minecraft p-2 sm:p-4 overflow-hidden select-none">
            <div className="relative w-full max-w-200 flex flex-col h-full max-h-[96dvh] sm:max-h-[90vh] justify-center">

                {/* Tabs */}
                <div className="relative flex w-full translate-y-2.5 z-10 items-end gap-1">
                    {/* L1 Icon placed outside */}
                    <div
                        onClick={() => handleTabChange('prev')}
                        title="Previous Tab (Left Arrow / L1)"
                        className="absolute -left-10 sm:-left-12 bottom-4.5 cursor-pointer hover:scale-110 transition-transform hidden sm:flex items-center z-30"
                    >
                        <img src={bumperLeft} alt="L1" className="w-8 h-8 pixelated drop-shadow-[2px_2px_0px_#000]" />
                    </div>

                    {tabs.map((tab) => {
                        const isActive = selectedTab === tab;
                        return (
                            <div
                                key={tab}
                                className="flex-1 "
                                style={{
                                    height: isActive ? 'clamp(54px, 8vh, 70px)' : 'clamp(48px, 7vh, 64px)',
                                    filter: 'drop-shadow(0 -4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)',
                                    zIndex: isActive ? 20 : 0,
                                }}>

                                <div
                                    className={`
                                        p-1 sm:p-2 w-full h-full text-center text-xs sm:text-md cursor-pointer relative pixel-corners-t
                                        ${isActive
                                            ? 'bg-[#c6c6c6] text-[#474747]'
                                            : 'bg-[#8d8d8d] text-[#474747] hover:bg-[#9d9d9d]'
                                        }
                                    `}
                                    style={{
                                        boxShadow: isActive ? 'inset 6px 6px 0px 0px #ffffff, inset -6px 0px 0px 0px #555555' : 'inset 6px 6px 0px 0px #aaaaaa, inset -6px 0px 0px 0px #555555',
                                    }}
                                    onClick={() => handleTabChange(tab)}
                                >
                                    <div className={`text-xs sm:text-md font-bold pt-2 sm:pt-4 ${isActive ? 'mt-2 sm:mt-3' : 'mt-1 sm:mt-2'}`}>
                                        {tab}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* R1 Icon placed outside */}
                    <div
                        onClick={() => handleTabChange('next')}
                        title="Next Tab (Right Arrow / R1)"
                        className="absolute -right-10 sm:-right-12 bottom-4.5 cursor-pointer hover:scale-110 transition-transform hidden sm:flex items-center z-30"
                    >
                        <img src={bumperRight} alt="R1" className="w-8 h-8 pixelated drop-shadow-[2px_2px_0px_#000]" />
                    </div>
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
                        <div className="flex flex-col h-full p-2 sm:p-8 min-h-0">
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
                                <div className="space-y-1.5 sm:space-y-2 p-2 sm:p-6 pb-8">
                                    {options.map((option, index) => {
                                        const isSelected = selectedOption === index;
                                        return (
                                            <MinecraftButton
                                                key={`${option.label}-${index}`}
                                                ref={(el) => { itemRefs.current[index] = el; }}
                                                isSelected={isSelected}
                                                className="h-12! sm:h-14! md:h-16! px-3 sm:px-6 md:pl-6 transition-transform shrink-0"
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
                                                        <img src={option.image} alt={option.label} className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-2 border-black bg-white ${option.image.toLowerCase().endsWith('.png')}`} style={{ imageRendering: 'pixelated', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black shrink-0" style={{ backgroundColor: option.color }} />
                                                    )}
                                                    <span className="text-sm sm:text-lg md:text-xl text-left leading-none py-2 truncate">{option.label}</span>
                                                </div>
                                            </MinecraftButton>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                            <div className="absolute right-6 sm:right-12 bottom-5 sm:bottom-6 z-20 pointer-events-none">
                                <div
                                    className="w-0 h-0 animate-bounce"
                                    style={{
                                        borderLeft: '10px solid transparent',
                                        borderRight: '10px solid transparent',
                                        borderTop: '16px solid #ffff55',
                                        filter: 'drop-shadow(2px 2px 0px #3f3f3f)'
                                    }}
                                />
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
