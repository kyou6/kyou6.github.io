import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type BackgroundMode = 'auto' | 'day' | 'night';

interface SettingsState {
    musicVolume: number;       // 0 to 1
    soundVolume: number;       // 0 to 1
    backgroundMode: BackgroundMode;
    animationsEnabled: boolean;
}

interface SettingsContextValue extends SettingsState {
    setMusicVolume: (v: number) => void;
    setSoundVolume: (v: number) => void;
    setBackgroundMode: (mode: BackgroundMode) => void;
    setAnimationsEnabled: (enabled: boolean) => void;
}

const STORAGE_KEY = 'mc-portfolio-settings';

const defaultSettings: SettingsState = {
    musicVolume: 0.2,
    soundVolume: 1.0,
    backgroundMode: 'auto',
    animationsEnabled: true,
};

const SettingsContext = createContext<SettingsContextValue>({
    ...defaultSettings,
    setMusicVolume: () => {},
    setSoundVolume: () => {},
    setBackgroundMode: () => {},
    setAnimationsEnabled: () => {},
});

export const useSettings = () => useContext(SettingsContext);

const loadSettings = (): SettingsState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...defaultSettings, ...parsed };
        }
    } catch {
        // Ignore parse errors
    }
    return defaultSettings;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SettingsState>(loadSettings);

    // Persist to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            // Ignore storage errors
        }
    }, [settings]);

    const setMusicVolume = useCallback((v: number) => {
        setSettings(prev => ({ ...prev, musicVolume: Math.max(0, Math.min(1, v)) }));
    }, []);

    const setSoundVolume = useCallback((v: number) => {
        setSettings(prev => ({ ...prev, soundVolume: Math.max(0, Math.min(1, v)) }));
    }, []);

    const setBackgroundMode = useCallback((mode: BackgroundMode) => {
        setSettings(prev => ({ ...prev, backgroundMode: mode }));
    }, []);

    const setAnimationsEnabled = useCallback((enabled: boolean) => {
        setSettings(prev => ({ ...prev, animationsEnabled: enabled }));
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                setMusicVolume,
                setSoundVolume,
                setBackgroundMode,
                setAnimationsEnabled,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
