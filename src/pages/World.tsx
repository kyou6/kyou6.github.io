import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import crossBtn from '../assets/ui/ps4/ps4_face_button_down.png';
import circleBtn from '../assets/ui/ps4/ps4_face_button_right.png';
import clickSound from '../assets/sound/click.mp3';

export const World: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('Create');
    const [selectedOption, setSelectedOption] = useState(0);

    const tabs = ['Load', 'Create', 'Join'];

    // Placeholder icons using colored blocks for now as we don't have the specific assets
    const options = [
        { label: "Create New World", color: "#4A8F28" },
        { label: "Play Tutorial", color: "#C68E42" },
        { label: "The Nightmare Before Christmas World", color: "#3B3B5E" },
        { label: "Pirates Of The Caribbean World", color: "#8E2F2F" },
        { label: "Egyptian Mythology World", color: "#D4B85E" },
        { label: "Norse Mythology World", color: "#7A5C42" },
        { label: "Festive World", color: "#BA2F2F" },
    ];

    return (
        <div className="flex items-center justify-center w-full h-screen font-minecraft p-4 overflow-hidden">
            <div className="relative w-[800px] max-w-full flex flex-col">

                {/* Tabs */}
                <div className="flex w-full translate-y-[10px] z-10 items-end gap-1">
                    {tabs.map((tab) => {
                        const isActive = selectedTab === tab;
                        const handleTabClick = () => {
                            const audio = new Audio(clickSound);
                            audio.play().catch(e => console.error("Error playing click sound:", e));
                            setSelectedTab(tab);
                        };

                        return (
                            <div
                                key={tab}
                                className="flex-1 "
                                style={{
                                    height: isActive ? '52px' : '42px',
                                    filter: 'drop-shadow(0 -4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)',
                                    zIndex: isActive ? 20 : 0,
                                }}
                            >
                                <div
                                    className={`
                                        w-full h-full text-center cursor-pointer relative pixel-corners-t transition-all duration-100
                                        ${isActive
                                            ? 'bg-[#c6c6c6] text-[#474747]'
                                            : 'bg-[#8d8d8d] text-[#474747] hover:bg-[#9d9d9d]'
                                        }
                                    `}
                                    style={{
                                        boxShadow: isActive ? 'inset 6px 6px 0px 0px #ffffff, inset -6px 0px 0px 0px #555555' : 'inset 6px 6px 0px 0px #aaaaaa, inset -6px 0px 0px 0px #555555',
                                    }}
                                    onClick={handleTabClick}
                                >
                                    <div className={`text-md font-bold pt-4 ${isActive ? 'mt-3' : 'mt-2'}`}>
                                        {tab}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Box */}
                <div style={{ filter: 'drop-shadow(0 4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)' }}>
                    <div
                        className="relative bg-[#c6c6c6] flex flex-col h-[640px] z-0 pixel-corners"
                        style={{
                            boxShadow: 'inset 6px 6px 0px 0px #ffffff, inset -6px -6px 0px 0px #555555',
                        }}
                    >
                        <div className="flex flex-col h-full p-4">
                            {/* Inner List Container */}
                            <div
                                className="flex-1 bg-[#8b8b8b] mt-4 mb-4 overflow-y-auto custom-scrollbar relative pt-6"
                                style={{
                                    boxShadow: `
                                    inset 6px 6px 0px 0px #373737,
                                    inset -6px -6px 0px 0px #ffffff
                                `
                                }}
                            >
                                <div className="space-y-[4px] p-4">
                                    {options.map((option, index) => {
                                        const isSelected = selectedOption === index;
                                        return (
                                            <MinecraftButton
                                                key={index}
                                                isSelected={isSelected}
                                                className="h-[64px]! justify-start pl-16 transition-transform"
                                                onClick={() => setSelectedOption(index)}
                                            >
                                                <div className="w-10 h-10 border-2 border-black shrink-0" style={{ backgroundColor: option.color }} />
                                                <span className="text-xl pt-1">{option.label}</span>
                                            </MinecraftButton>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                            <div className="absolute right-12 bottom-5 z-20">
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
                <div className="flex gap-8 mt-4 text-xl text-white">
                    <div className="flex items-center gap-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                        <img src={crossBtn} alt="Select" className="w-8 h-8" />
                        <span className="tracking-wide">Select</span>
                    </div>
                    <div
                        className="flex items-center gap-3 cursor-pointer drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:brightness-110"
                        onClick={() => navigate('/')}
                    >
                        <img src={circleBtn} alt="Back" className="w-8 h-8" />
                        <span className="tracking-wide">Back</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
