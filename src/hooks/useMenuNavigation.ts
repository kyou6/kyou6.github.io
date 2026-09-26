import { useEffect } from 'react';
import { playBackSound, playPressSound } from '../utils/sound';

interface SubpageNavigationOptions {
    onBack: () => void;
    onEnter?: () => void;
}

export const useSubpageNavigation = ({ onBack, onEnter }: SubpageNavigationOptions) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                playBackSound();
                onBack();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                playPressSound();
                if (onEnter) {
                    onEnter();
                } else {
                    onBack();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onBack, onEnter]);
};
