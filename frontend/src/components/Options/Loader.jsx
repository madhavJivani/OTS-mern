import React, { useEffect, useState } from "react";

const Loader = ({ messages, interval = 300 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, interval);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [messages, interval]);

    return (
        <div className="fixed inset-x-0 top-0 flex items-center justify-center bg-[#101218] bg-opacity-95 z-50 h-[calc(100vh-4rem)]" style={{ marginTop: "4rem" }}>
            {/* Spinning Loader */}
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-[#6588cb] border-[#2d3343] rounded-full animate-spin"></div>
                {/* Text Below Loader */}
                <div className="mt-4 text-sm font-medium text-center text-[#fafafa]">
                    {messages[currentIndex]}
                </div>
            </div>
        </div>
    );
};

export default Loader;
