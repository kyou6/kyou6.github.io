import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import logo from '../assets/ui/icons/logo.png';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Minecraft Dashboard";
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-minecraft">
            {/* Logo Section */}
            <div className="relative mb-8 text-center z-10 flex flex-col items-center">
                <div className="relative">
                    <img
                        src={logo}
                        alt="My Portfolio Logo"
                        className="max-w-[600px] w-[90vw] pixelated drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
                    />
                    <div className="absolute bottom-6 -right-16 text-mc-yellow text-[1.5rem] md:text-[2rem] font-bold -rotate-5 drop-shadow-[2px_2px_0px_#3f3f3f] animate-pulse-fast whitespace-nowrap z-20">
                        Welcome
                    </div>
                </div>
            </div>

            {/* Menu Buttons */}
            <div className="flex flex-col gap-2 w-[320px] md:w-[480px] z-10 mt-4">
                <MinecraftButton onClick={() => navigate('/world')}>Start</MinecraftButton>
                <MinecraftButton>Mini Games</MinecraftButton>
                <MinecraftButton onClick={() => window.open("https://github.com/kyou6", "_blank")}>Github</MinecraftButton>
                <MinecraftButton onClick={() => window.open("https://store.playstation.com/en-us/concept/10004884", "_blank")}>Minecraft Store</MinecraftButton>
                <MinecraftButton onClick={() => window.close()}>Exit</MinecraftButton>
            </div>
        </div>
    );
};
