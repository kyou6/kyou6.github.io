import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import { MinecraftScrollbar } from '../components/MinecraftScrollbar';
import crossBtn from '../assets/ui/xbox/ButtonA.png';
import circleBtn from '../assets/ui/xbox/ButtonB.png';
import bumperLeft from '../assets/ui/xbox/ButtonLeftBumper.png';
import bumperRight from '../assets/ui/xbox/ButtonRightBumper.png';
import { playPressSound, playBackSound, playScrollSound } from '../utils/sound';
import figmaLogo from '../assets/social/figma.png';

import { profileOptions } from '../data/profile';
import type { WorldOption } from '../data/profile';

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
    const tabs = ['Profile', 'Projects', 'Repository'];
    const [selectedTab, setSelectedTab] = useState('Profile');
    const [selectedOption, setSelectedOption] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
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
            .catch(err => console.error('Failed to fetch Github repos:', err));
    }, []);

    const tabOptions: Record<string, Array<WorldOption>> = {
        Profile: profileOptions,
        Projects: [
            {
                label: "ExMak: An Examination Result Management System for the Schools Division Office of Makati City",
                color: "#F24E1E",
                path: "https://www.figma.com/design/eJIs53zyLPIPdUXtIMOUgz/ExMak?node-id=3131-13673&t=VEmoysO0VyPXxB3V-1",
                image: figmaLogo
            }
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

    const handleOpenOption = useCallback((option: { path?: string }) => {
        if (!option.path) return;
        playPressSound();
        setTimeout(() => {
            if (option.path!.startsWith('http://') || option.path!.startsWith('https://')) {
                window.open(option.path, '_blank');
            } else {
                navigate(option.path!);
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
                if (selectedTab === 'Profile' && !isExpanded) {
                    playPressSound();
                    setIsExpanded(true);
                } else if (options[selectedOption]) {
                    handleOpenOption(options[selectedOption]);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                playBackSound();
                if (isExpanded) {
                    setIsExpanded(false);
                } else {
                    navigate('/');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, selectedOption, handleTabChange, handleOpenOption, navigate, selectedTab, isExpanded]);

    // Scroll active item into view
    useEffect(() => {
        const el = itemRefs.current[selectedOption];
        if (el) {
            el.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
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
            <div className={`relative w-full ${isExpanded && selectedTab === 'Profile' ? 'max-w-300 lg:max-w-300' : 'max-w-200'} transition-all duration-200 flex flex-col h-full max-h-[96dvh] sm:max-h-[90vh] justify-center`}>

                {/* Tabs */}
                <div className="relative flex w-full translate-y-2.5 z-10 items-end gap-1">
                    {/* L1 Icon placed outside */}
                    <div
                        onClick={() => handleTabChange('prev')}
                        title="Previous Tab (Left Arrow / LB)"
                        className="absolute -left-10 sm:-left-12 bottom-4.5 cursor-pointer hover:scale-110 transition-transform hidden sm:flex items-center z-30"
                    >
                        <img src={bumperLeft} alt="LB" className="w-8 h-8 pixelated drop-shadow-[2px_2px_0px_#000]" />
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

                    {/* RB Icon placed outside */}
                    <div
                        onClick={() => handleTabChange('next')}
                        title="Next Tab (Right Arrow / RB)"
                        className="absolute -right-10 sm:-right-12 bottom-4.5 cursor-pointer hover:scale-110 transition-transform hidden sm:flex items-center z-30"
                    >
                        <img src={bumperRight} alt="RB" className="w-8 h-8 pixelated drop-shadow-[2px_2px_0px_#000]" />
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
                        <div className="flex flex-col h-full p-2 pt-3 sm:p-6 min-h-0">
                            {selectedTab === 'Profile' && isExpanded ? (
                                <div className="flex flex-col md:flex-row gap-2 md:gap-4 h-full min-h-0">
                                    {/* Select: Horizontal on mobile, vertical column on desktop */}
                                    <div className="flex flex-col shrink-0 w-full md:w-24 lg:w-28 md:h-full min-h-0">
                                        <div className="text-xs sm:text-sm font-bold text-[#474747] mb-1 px-1 tracking-wider text-left md:text-center">
                                            Select
                                        </div>
                                        <div
                                            className="bg-[#8b8b8b] mt-0.5 md:mt-1 mb-1 md:mb-2 min-h-0 rounded-none relative overflow-x-auto md:overflow-y-auto custom-scrollbar md:flex-1 p-1.5 sm:p-2 shrink-0"
                                            style={{
                                                boxShadow: 'inset 4px 4px 0px 0px #373737, inset -4px -4px 0px 0px #ffffff'
                                            }}
                                        >
                                            <div className="flex flex-row md:flex-col gap-1.5 sm:gap-2">
                                                {options.map((option, index) => {
                                                    const isSelected = selectedOption === index;
                                                    return (
                                                        <MinecraftButton
                                                            key={`${option.label}-${index}`}
                                                            ref={(el) => { itemRefs.current[index] = el; }}
                                                            isSelected={isSelected}
                                                            className="w-11! h-11! sm:w-13! sm:h-13! md:w-full! md:h-14! lg:h-16! p-0 transition-transform shrink-0"
                                                            title={option.label}
                                                            onClick={() => {
                                                                if (isSelected) {
                                                                    setIsExpanded(false);
                                                                } else {
                                                                    setSelectedOption(index);
                                                                }
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-center w-full h-full">
                                                                {option.image ? (
                                                                    <img
                                                                        src={option.image}
                                                                        alt={option.label}
                                                                        className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 shrink-0 border-2 border-black bg-white ${option.image.toLowerCase().endsWith('.png') ? '' : ''}`}
                                                                        style={{ imageRendering: 'pixelated', objectFit: 'cover' }}
                                                                    />
                                                                ) : (
                                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-2 border-black shrink-0" style={{ backgroundColor: option.color }} />
                                                                )}
                                                            </div>
                                                        </MinecraftButton>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right / Bottom Column: World Details */}
                                    <div className="flex flex-col min-h-0 h-full flex-1">
                                        <div className="text-xs sm:text-sm font-bold text-[#474747] mb-1 px-1 tracking-wider">
                                            Details
                                        </div>
                                        <div
                                            className="flex-1 bg-[#8b8b8b] mt-0.5 md:mt-1 mb-1 md:mb-2 min-h-0 rounded-none text-white relative overflow-hidden"
                                            style={{
                                                boxShadow: 'inset 6px 6px 0px 0px #373737, inset -6px -6px 0px 0px #ffffff'
                                            }}
                                        >
                                            <MinecraftScrollbar contentClassName="p-3 sm:p-5">
                                                {options[selectedOption] ? (
                                                    <div className="flex flex-col h-full space-y-3.5">
                                                        {/* Header item with icon & title */}
                                                        <div className="flex items-center gap-3 pb-3 border-b-2 border-[#555555]">
                                                            {options[selectedOption].image ? (
                                                                <img
                                                                    src={options[selectedOption].image}
                                                                    alt={options[selectedOption].label}
                                                                    className="w-10 h-10 shrink-0 border-2 border-black bg-white"
                                                                    style={{ imageRendering: 'pixelated', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="w-10 h-10 border-2 border-black shrink-0"
                                                                    style={{ backgroundColor: options[selectedOption].color }}
                                                                />
                                                            )}
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-base sm:text-lg font-bold text-[#ffffa0] truncate drop-shadow-[2px_2px_0px_#000]">
                                                                    {options[selectedOption].label}
                                                                </span>
                                                                <span className="text-xs text-[#d0d0d0]">
                                                                    World Information
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Description paragraph */}
                                                        <div className="bg-[#727272]/60 p-2 border-2 border-[#555555] text-xs sm:text-sm leading-relaxed text-[#f0f0f0] drop-shadow-[1px_1px_0px_#000]">
                                                            {options[selectedOption].description || "Details and information for this world will be displayed here."}
                                                        </div>

                                                        {/* Key details / Sections list */}
                                                        {options[selectedOption].sections ? (
                                                            <div className="space-y-4 pt-1">
                                                                {options[selectedOption].sections.map((section, sIdx) => (
                                                                    section.roles ? (
                                                                        <div key={sIdx} className="bg-[#5c5c5c]/40 border border-[#4a4a4a] p-3 sm:p-4 space-y-2">
                                                                            {/* Company Header with Logo */}
                                                                            <div className="flex items-center gap-3">
                                                                                {section.logo || section.image ? (
                                                                                    <img
                                                                                        src={section.logo || section.image}
                                                                                        alt={section.company || section.title || ''}
                                                                                        className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 border border-black bg-white object-contain p-0.5"
                                                                                        style={{ imageRendering: 'pixelated' }}
                                                                                    />
                                                                                ) : (
                                                                                    <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 border border-black bg-[#404040] flex items-center justify-center font-bold text-base text-[#ffffa0]">
                                                                                        {(section.company || section.title || 'C')[0]}
                                                                                    </div>
                                                                                )}
                                                                                <div className="flex flex-col min-w-0">
                                                                                    <span className="pt-1 text-xs sm:text-base font-bold text-white drop-shadow-[1px_1px_0px_#000] truncate">
                                                                                        {section.company || section.title}
                                                                                    </span>
                                                                                    {section.subtitle && (
                                                                                        <span className="text-xs text-[#a0a0a0]">
                                                                                            {section.subtitle}
                                                                                        </span>
                                                                                    )}
                                                                                    {section.location && (
                                                                                        <span className="text-xs text-[#888888] truncate">
                                                                                            {section.location}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Roles Timeline */}
                                                                            <div className="relative pl-6 sm:pl-7 ml-5 sm:ml-5.5 border-l-2 border-[#555555] space-y-4 pt-1">
                                                                                {section.roles.map((role, rIdx) => (
                                                                                    <div key={rIdx} className="relative">
                                                                                        {/* Timeline Node / Bullet */}
                                                                                        <div
                                                                                            className="absolute -left-7.75 sm:-left-8.75 top-1.5 w-2.5 h-2.5 rounded-none bg-[#aaaaaa] border-2 border-[#222222]"
                                                                                        />

                                                                                        <div className="text-xs sm:text-sm font-bold text-[#ffffa0] drop-shadow-[1px_1px_0px_#000]">
                                                                                            {role.title}
                                                                                        </div>
                                                                                        {role.employmentType && (
                                                                                            <div className="text-xs text-[#d0d0d0]">
                                                                                                {role.employmentType}
                                                                                            </div>
                                                                                        )}
                                                                                        {role.period && (
                                                                                            <div className="text-xs text-[#cccccc]">
                                                                                                {role.period}
                                                                                            </div>
                                                                                        )}
                                                                                        {role.location && (
                                                                                            <div className="text-xs text-[#bbbbbb]">
                                                                                                {role.location}
                                                                                            </div>
                                                                                        )}
                                                                                        {role.description && (
                                                                                            <div className="text-xs text-[#e0e0e0] mt-1.5 leading-relaxed">
                                                                                                {role.description}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div key={sIdx} className="space-y-1.5">
                                                                            {section.title && (
                                                                                <div className="text-xs sm:text-sm font-bold text-[#ffffa0] tracking-wide px-1 drop-shadow-[1px_1px_0px_#000]">
                                                                                    {section.title}
                                                                                </div>
                                                                            )}
                                                                            <div className="space-y-1.5">
                                                                                {section.items?.map((item, idx) => (
                                                                                    <div
                                                                                        key={idx}
                                                                                        className="flex items-center justify-between text-xs sm:text-sm bg-[#5c5c5c]/40 px-3 py-2 border border-[#4a4a4a]"
                                                                                    >
                                                                                        <span className="text-[#cccccc]">{item.label}:</span>
                                                                                        <span className="text-[#ffffa0] font-bold drop-shadow-[1px_1px_0px_#000] text-right ml-2">
                                                                                            {item.value}
                                                                                        </span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                ))}
                                                            </div>
                                                        ) : options[selectedOption].details ? (
                                                            <div className="space-y-1.5 pt-1">
                                                                {options[selectedOption].details.map((detail, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="flex items-center justify-between text-xs sm:text-sm bg-[#5c5c5c]/40 px-3 py-2 border border-[#4a4a4a]"
                                                                    >
                                                                        <span className="text-[#cccccc]">{detail.label}:</span>
                                                                        <span className="text-[#ffffa0] font-bold drop-shadow-[1px_1px_0px_#000] text-right ml-2">
                                                                            {detail.value}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs sm:text-sm text-[#cccccc]">
                                                        Select an option to view details
                                                    </div>
                                                )}
                                            </MinecraftScrollbar>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Standard Full-Width List for initial Load scale and other tabs */
                                <div
                                    ref={scrollContainerRef}
                                    className="flex-1 bg-[#8b8b8b] mt-1 sm:mt-2 mb-1 sm:mb-2 overflow-y-auto custom-scrollbar relative pt-2 sm:pt-4 pb-6 min-h-0 rounded-none"
                                    style={{
                                        boxShadow: 'inset 6px 6px 0px 0px #373737, inset -6px -6px 0px 0px #ffffff'
                                    }}
                                >
                                    <div className="p-2 sm:p-6 pb-8">
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
                                                        if (selectedTab === 'Profile') {
                                                            setIsExpanded(true);
                                                        } else {
                                                            handleOpenOption(option);
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 sm:gap-6 w-full h-full">
                                                        {option.image ? (
                                                            <img
                                                                src={option.image}
                                                                alt={option.label}
                                                                className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-2 border-black bg-white ${option.image.toLowerCase().endsWith('.png')}`}
                                                                style={{ imageRendering: 'pixelated', objectFit: 'cover' }}
                                                            />
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
                            )}

                            {/* Scroll Indicator */}
                            {(!isExpanded || selectedTab !== 'Profile') && (
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
                            )}
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
                            if (isExpanded) {
                                setIsExpanded(false);
                            } else {
                                navigate('/');
                            }
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
