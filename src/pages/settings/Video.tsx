import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../../components/MinecraftButton';
import circleBtn from '../../assets/ui/ps4/ps4_face_button_right.png';
import { playBackSound } from '../../utils/sound';
import { useSubpageNavigation } from '../../hooks/useMenuNavigation';

export const Video: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = useCallback(() => {
        playBackSound();
        navigate('/');
    }, [navigate]);

    useSubpageNavigation({
        onBack: handleBack,
        onEnter: handleBack,
    });

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen font-minecraft text-white p-4">
            <div className="bg-[#c6c6c6] p-8 border-4 border-double border-white max-w-md w-full text-center relative pixel-corners"
                style={{ boxShadow: 'inset 6px 6px 0px 0px #ffffff, inset -6px -6px 0px 0px #555555' }}>
                <h1 className="text-lg md:text-xl mb-6 text-[#474747] font-bold drop-shadow-[2px_2px_0px_#ffffff]">Video Settings</h1>
                <p className="text-md text-black mb-8">Video settings configuration options will go here.</p>
                <MinecraftButton isSelected={true} onClick={handleBack}>Done</MinecraftButton>
            </div>

            <div className="mt-8 flex items-center gap-2 cursor-pointer drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]" onClick={handleBack}>
                <img src={circleBtn} alt="Back" className="w-6 h-6 pixelated" />
                <span>Back</span>
            </div>
        </div>
    );
};
