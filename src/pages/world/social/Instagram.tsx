import React, { useEffect } from 'react';

export const Instagram: React.FC = () => {
    useEffect(() => {
        window.location.href = "https://instagram.com";
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen font-minecraft text-white bg-black">
            <p>Redirecting to Instagram...</p>
        </div>
    );
};
