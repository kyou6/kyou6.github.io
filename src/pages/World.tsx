import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import crossBtn from '../assets/ui/ps4/ps4_face_button_down.png';
import circleBtn from '../assets/ui/ps4/ps4_face_button_right.png';
import clickSound from '../assets/sound/press.wav';
import backSound from '../assets/sound/back.wav';

export const World: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('Create');
    const [selectedOption, setSelectedOption] = useState(0);

    const tabs = ['Load', 'Social', 'Repository'];

    // Placeholder icons using colored blocks for now as we don't have the specific assets
    const options = [
        { label: "Introduction", color: "#4A8F28" },
        { label: "Educational Background", color: "#C68E42" },
    ];

    return (
        <div className="flex items-center justify-center w-full h-screen font-minecraft p-4 overflow-hidden">
            <div className="relative w-full max-w-[800px] flex flex-col h-full max-h-[90vh] sm:max-h-full sm:h-auto justify-center">

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
                                    height: isActive ? '70px' : '64px',
                                    filter: 'drop-shadow(0 -4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)',
                                    zIndex: isActive ? 20 : 0,
                                }}>
                                
                                <div
                                    className={`
                                        p-2 w-full h-full text-center text-md cursor-pointer relative pixel-corners-t
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
                <div
                    className="w-full flex-1 sm:flex-none sm:h-[640px] flex flex-col"
                    style={{ filter: 'drop-shadow(0 4px 0 #000) drop-shadow(-4px 0 0 #000) drop-shadow(4px 0 0 #000)' }}
                >
                    <div
                        className="relative bg-[#c6c6c6] flex flex-col h-full z-0 pixel-corners"
                        style={{
                            boxShadow: 'inset 6px 6px 0px 0px #ffffff, inset -6px -6px 0px 0px #555555',
                        }}
                    >
                        <div className="flex flex-col h-full p-2 sm:p-4">
                            {/* Inner List Container */}
                            <div
                                className="flex-1 bg-[#8b8b8b] mt-4 mb-4 overflow-y-auto custom-scrollbar relative pt-2 sm:pt-6"
                                style={{
                                    boxShadow: `
                                    inset 6px 6px 0px 0px #373737,
                                    inset -6px -6px 0px 0px #ffffff
                                `
                                }}
                            >
                                <div className="space-y-[4px] p-2 sm:p-4">
                                    {options.map((option, index) => {
                                        const isSelected = selectedOption === index;
                                        return (
                                            <MinecraftButton
                                                key={index}
                                                isSelected={isSelected}
                                                // Fixed usage of flex for alignment 
                                                className="h-[64px]! flex items-center justify-start px-4 sm:px-8 md:pl-16 transition-transform gap-4"
                                                onClick={() => setSelectedOption(index)}
                                            >
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black shrink-0" style={{ backgroundColor: option.color }} />
                                                <span className="text-sm sm:text-xl pt-1 text-left">{option.label}</span>
                                            </MinecraftButton>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                            <div className="absolute right-6 sm:right-12 bottom-5 z-20">
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
                <div className="flex gap-4 sm:gap-8 mt-4 text-md sm:text-xl text-white justify-center sm:justify-start">
                    <div className="flex items-center gap-2 sm:gap-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                        <img src={crossBtn} alt="Select" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="tracking-wide">Select</span>
                    </div>
                    <div
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:brightness-110"
                        onClick={() => {
                            const audio = new Audio(backSound);
                            audio.play().catch(e => console.error("Error playing back sound:", e));
                            navigate('/');
                        }}
                    >
                        <img src={circleBtn} alt="Back" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="tracking-wide">Back</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
