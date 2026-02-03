import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import logo from '../assets/ui/icons/logo.png';
import crossBtn from '../assets/ui/ps4/ps4_face_button_down.png';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Minecraft Dashboard";
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center font-minecraft">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1400px] px-4">

                {/* Logo Section */}
                <div className="relative mb-8 sm:mb-12 md:mb-16 text-center z-10 flex flex-col items-center scale-90 sm:scale-100 transition-transform duration-300">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="My Portfolio Logo"
                            className="max-w-[700px] md:max-w-[1000px] lg:max-w-[1200px] w-[90vw] pixelated drop-shadow-[6px_6px_0px_rgba(0,0,0,0.5)]"
                        />
                        {/* Splash Text */}
                        <div className="absolute -bottom-4 -right-2 sm:bottom-0 sm:-right-8 md:bottom-8 md:-right-16 text-mc-yellow text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] drop-shadow-[3px_3px_0px_#3f3f3f] animate-pulse-fast whitespace-nowrap z-20 -rotate-20 origin-center">
                            Welcome
                        </div>
                    </div>
                </div>

                {/* Menu Buttons */}
                {/* Wider buttons to match console UI style */}
                <div className="flex flex-col gap-3 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] z-10 mt-4 md:mt-8">
                    <MinecraftButton className="h-12 sm:h-14 md:h-16 text-lg sm:text-xl md:text-2xl" onClick={() => navigate('/world')}>Start</MinecraftButton>
                    <MinecraftButton className="h-12 sm:h-14 md:h-16 text-lg sm:text-xl md:text-2xl" onClick={() => navigate('/statistics')}>Statistics</MinecraftButton>
                    <MinecraftButton className="h-12 sm:h-14 md:h-16 text-lg sm:text-xl md:text-2xl" onClick={() => window.open("https://github.com/kyou6", "_blank")}>Github</MinecraftButton>
                    <MinecraftButton className="h-12 sm:h-14 md:h-16 text-lg sm:text-xl md:text-2xl" onClick={() => window.close()}>Exit</MinecraftButton>
                </div>
            </div>

            {/* Footer Control Hints */}
            <div className="w-full p-6 z-20 flex justify-between items-end pb-8 sm:pb-12 px-8 sm:px-16 text-white text-xl sm:text-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] absolute bottom-0">
                <div className="flex items-center gap-3">
                    <img src={crossBtn} alt="Select" className="w-16 h-16 sm:w-16 sm:h-16" />
                    <span className="tracking-wide">Select</span>
                </div>
            </div>
        </div>
    );
};
