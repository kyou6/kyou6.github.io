import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinecraftButton } from '../components/MinecraftButton';
import { MinecraftSlider } from '../components/MinecraftSlider';
import { MinecraftToggle } from '../components/MinecraftToggle';
import { useSettings } from '../context/SettingsContext';
import type { BackgroundMode } from '../context/SettingsContext';
import { setSoundVolume, playBackSound, playScrollSound, playPressSound } from '../utils/sound';
import crossBtn from '../assets/ui/xbox/ButtonA.png';
import circleBtn from '../assets/ui/xbox/ButtonB.png';

const BG_MODES: BackgroundMode[] = ['auto', 'day', 'night'];
const BG_LABELS: Record<BackgroundMode, string> = {
    auto: 'Real Time (Default)',
    day: 'Always Day',
    night: 'Always Night',
};

export const Settings: React.FC = () => {
    const navigate = useNavigate();
    const tabs = ['Help and Options'];
    const [selectedTab, setSelectedTab] = useState('Help and Options');
    const {
        musicVolume,
        soundVolume,
        backgroundMode,
        animationsEnabled,
        setMusicVolume,
        setSoundVolume: setContextSoundVolume,
        setBackgroundMode,
        setAnimationsEnabled,
    } = useSettings();

    const [selectedIndex, setSelectedIndex] = useState(0);

    // Number of interactive items (Music Slider, Sound Slider, Background Toggle, Animations Toggle, Done Button)
    const itemCount = 5;

    const handleBack = useCallback(() => {
        playBackSound();
        navigate('/');
    }, [navigate]);

    // Keep the global sound module in sync with context
    useEffect(() => {
        setSoundVolume(soundVolume);
    }, [soundVolume]);

    const handleSoundVolumeChange = useCallback((v: number) => {
        setContextSoundVolume(v);
        setSoundVolume(v);
    }, [setContextSoundVolume]);

    const cycleBgMode = useCallback(() => {
        const currentIdx = BG_MODES.indexOf(backgroundMode);
        const nextIdx = (currentIdx + 1) % BG_MODES.length;
        setBackgroundMode(BG_MODES[nextIdx]);
    }, [backgroundMode, setBackgroundMode]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                playScrollSound();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : itemCount - 1));
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                playScrollSound();
                setSelectedIndex(prev => (prev < itemCount - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (selectedIndex === 0) {
                    setMusicVolume(Math.max(0, musicVolume - 0.05));
                    playScrollSound();
                } else if (selectedIndex === 1) {
                    handleSoundVolumeChange(Math.max(0, soundVolume - 0.05));
                    playScrollSound();
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (selectedIndex === 0) {
                    setMusicVolume(Math.min(1, musicVolume + 0.05));
                    playScrollSound();
                } else if (selectedIndex === 1) {
                    handleSoundVolumeChange(Math.min(1, soundVolume + 0.05));
                    playScrollSound();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex === 2) {
                    playPressSound();
                    cycleBgMode();
                } else if (selectedIndex === 3) {
                    playPressSound();
                    setAnimationsEnabled(!animationsEnabled);
                } else if (selectedIndex === 4) {
                    handleBack();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                handleBack();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, musicVolume, soundVolume, animationsEnabled, backgroundMode, handleBack, setMusicVolume, handleSoundVolumeChange, cycleBgMode, setAnimationsEnabled]);

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
                                className="flex-1 flex flex-col mt-1 sm:mt-2 mb-1 sm:mb-2 overflow-hidden relative min-h-0 rounded-none"
                            >
                                {/* Scrollable settings area */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="space-y-1.5 sm:space-y-2 p-2 sm:p-4">
                                        {/* ── Audio Section ─────────────────── */}
                                        <div className="text-xs sm:text-sm text-[#474747] font-bold mb-1 tracking-wide">
                                            Sound and Music
                                        </div>

                                        {/* Music Volume Slider */}
                                        <MinecraftSlider
                                            label="Music"
                                            value={musicVolume}
                                            onChange={setMusicVolume}
                                            isSelected={selectedIndex === 0}
                                            onSelect={() => setSelectedIndex(0)}
                                        />

                                        {/* Sound Volume Slider */}
                                        <MinecraftSlider
                                            label="Sound"
                                            value={soundVolume}
                                            onChange={handleSoundVolumeChange}
                                            isSelected={selectedIndex === 1}
                                            onSelect={() => setSelectedIndex(1)}
                                        />

                                        {/* ── Display Section ───────────────── */}
                                        <div className="text-xs sm:text-sm text-[#474747] font-bold mt-4 mb-1 tracking-wide">
                                            Display
                                        </div>

                                        {/* Background Mode Toggle */}
                                        <MinecraftToggle
                                            label="Background"
                                            value={true}
                                            onChange={cycleBgMode}
                                            isSelected={selectedIndex === 2}
                                            onSelect={() => setSelectedIndex(2)}
                                            onLabel={BG_LABELS[backgroundMode]}
                                            offLabel={BG_LABELS[backgroundMode]}
                                        />

                                        {/* Animations Toggle */}
                                        <MinecraftToggle
                                            label="Animation"
                                            value={animationsEnabled}
                                            onChange={setAnimationsEnabled}
                                            isSelected={selectedIndex === 3}
                                            onSelect={() => setSelectedIndex(3)}
                                        />
                                    </div>
                                </div>

                                {/* Done Button — pinned to bottom inside the inset box */}
                                <div className="shrink-0 p-2 sm:p-4 pt-0">
                                    <MinecraftButton
                                        isSelected={selectedIndex === 4}
                                        onMouseEnter={() => setSelectedIndex(4)}
                                        onClick={handleBack}
                                        className="h-10! sm:h-12!"
                                    >
                                        Done
                                    </MinecraftButton>
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
                        onClick={handleBack}
                    >
                        <img src={circleBtn} alt="Back" className="w-5 h-5 sm:w-8 sm:h-8 pixelated" />
                        <span className="tracking-wide">Back</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export const Video = Settings;
export default Settings;
