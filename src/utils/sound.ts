import pressSound from '../assets/sound/press.ogg';
import backSound from '../assets/sound/back.ogg';
import scrollSound from '../assets/sound/scroll.ogg';
import focusSound from '../assets/sound/focus.ogg';

const playSound = (src: string) => {
    try {
        const audio = new Audio(src);
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
