import pressSound from '../assets/sound/press.ogg';
import backSound from '../assets/sound/back.ogg';
import scrollSound from '../assets/sound/scroll.ogg';
import focusSound from '../assets/sound/focus.ogg';

// Global sound volume (0 to 1), managed by SettingsContext
let _soundVolume = 1.0;

export const setSoundVolume = (vol: number) => {
    _soundVolume = Math.max(0, Math.min(1, vol));
};

export const getSoundVolume = () => _soundVolume;

const playSound = (src: string) => {
    try {
        if (_soundVolume <= 0) return;
        const audio = new Audio(src);
        audio.volume = _soundVolume;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    } catch {
        // Ignore audio errors
    }
};

export const playPressSound = () => playSound(pressSound);
export const playBackSound = () => playSound(backSound);
export const playScrollSound = () => playSound(scrollSound);
export const playFocusSound = () => playSound(focusSound);
