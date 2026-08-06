import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../../../components/MinecraftButton';
import circleBtn from '../../../assets/ui/ps4/ps4_face_button_right.png';
import backSound from '../../../assets/sound/back.wav';

export const Achievements: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        const audio = new Audio(backSound);
        audio.play().catch(e => console.error(e));
        navigate('/world');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen font-minecraft text-white p-4">
            <div className="bg-[#c6c6c6] p-8 max-w-2xl w-full text-center relative pixel-corners"
                 style={{ boxShadow: 'inset 6px 6px 0px 0px #ffffff, inset -6px -6px 0px 0px #555555' }}>
                <h1 className="text-lg md:text-xl mb-6 text-[#474747] font-bold">Achievements</h1>
                <div className="bg-[#8b8b8b] p-6 text-left mb-6 text-white border-4 border-black pixel-corners"
                     style={{ boxShadow: 'inset 6px 6px 0px 0px #373737, inset -6px -6px 0px 0px #ffffff' }}>
                    <p className="mb-4">My career achievements and accomplishments go here.</p>
                </div>
                <MinecraftButton onClick={handleBack}>Go Back to World Menu</MinecraftButton>
            </div>
            
            <div className="mt-8 flex items-center gap-2 cursor-pointer drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]" onClick={handleBack}>
                <img src={circleBtn} alt="Back" className="w-6 h-6" />
                <span>Back</span>
            </div>
        </div>
    );
};
