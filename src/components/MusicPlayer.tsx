import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import menu1 from '../assets/music/menu1.ogg';
import menu2 from '../assets/music/menu2.ogg';
import menu3 from '../assets/music/menu3.ogg';
import menu4 from '../assets/music/menu4.ogg';

const playlist = [menu1, menu2, menu3, menu4];

export const MusicPlayer: React.FC = () => {
    const { musicVolume } = useSettings();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(() => Math.floor(Math.random() * playlist.length));
    const [hasInteracted, setHasInteracted] = useState(false);

    const isMuted = musicVolume <= 0;

    const playNext = () => {
        let nextIndex;
        if (playlist.length > 1) {
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentTrackIndex);
        } else {
            nextIndex = 0;
        }
        setCurrentTrackIndex(nextIndex);
    };

    useEffect(() => {
        const startMusic = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
            }
        };

        window.addEventListener('click', startMusic);
        window.addEventListener('keydown', startMusic);

        return () => {
            window.removeEventListener('click', startMusic);
            window.removeEventListener('keydown', startMusic);
        };
    }, [hasInteracted]);

    useEffect(() => {
        if (hasInteracted && audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : musicVolume;
            audioRef.current.src = playlist[currentTrackIndex];
            audioRef.current.play().catch(err => {
                console.log("Playback delayed or blocked:", err);
            });
        }
    }, [currentTrackIndex, hasInteracted]);

    // React to volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : musicVolume;
            if (isMuted) {
                audioRef.current.pause();
            } else if (hasInteracted) {
                audioRef.current.play().catch(() => { });
            }
        }
    }, [musicVolume, isMuted, hasInteracted]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                audioRef.current?.pause();
            } else if (hasInteracted && !isMuted) {
                audioRef.current?.play().catch(() => { });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [hasInteracted, isMuted]);

    return (
        <audio
            ref={audioRef}
            onEnded={playNext}
            style={{ display: 'none' }}
        />
    );
};
