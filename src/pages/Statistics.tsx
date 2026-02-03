import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import circleBtn from '../assets/ui/ps4/ps4_face_button_right.png';
import clickSound from '../assets/sound/click.ogg';

export const Statistics: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('Overview');

    const tabs = ['Overview'];

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
                                className="flex-1 bg-[#959593] mt-4 mb-4 overflow-y-auto custom-scrollbar relative pt-6 flex items-center justify-center"
                                style={{
                                    boxShadow: `
                                    inset 6px 6px 0px 0px #373737,
                                    inset -6px -6px 0px 0px #ffffff
                                `
                                }}
                            >
                                <img src="https://github-readme-activity-graph.vercel.app/graph?username=kyou6&bg_color=959593&color=ffffff&line=ffffff&point=c2c8e9&area=true&hide_border=true" height="270" alt="activity-graph graph" className="max-w-full max-h-full p-4 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex gap-8 mt-4 text-xl text-white">
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
