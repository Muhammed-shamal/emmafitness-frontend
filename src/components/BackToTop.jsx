'use client';

import { useEffect, useState } from "react";
import { UpOutlined } from "@ant-design/icons";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setVisible(scrollTop > 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
            <button
                onClick={scrollToTop}
                className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 animate-float"
                aria-label="Back to top"
            >
                <UpOutlined className="text-lg" />
            </button>
        </div>
    );
};

export default BackToTop;