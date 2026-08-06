import React, { useEffect } from 'react';

export const Facebook: React.FC = () => {
    useEffect(() => {
        window.location.href = "https://facebook.com";
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-screen font-minecraft text-white bg-black">
            <p>Redirecting to Facebook...</p>
        </div>
    );
};
