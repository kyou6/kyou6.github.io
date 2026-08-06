import React, { useEffect } from 'react';

export const Youtube: React.FC = () => {
    useEffect(() => {
        window.location.href = "https://youtube.com";
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen font-minecraft text-white bg-black">
            <p>Redirecting to Youtube...</p>
        </div>
    );
};
