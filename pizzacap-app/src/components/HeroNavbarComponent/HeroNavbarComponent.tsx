import { useState, FC } from 'react';

const tabs = ['PizzaCap', 'Photos', 'Labels - Provenances'];

interface HeroTabBarProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

export const HeroNavbar: FC<HeroTabBarProps> = ({
    activeIndex,
    setActiveIndex,
}) => {
    return (
        <div className="relative flex border-2 border-primary-variant rounded-full overflow-hidden bg-primary">
            {/* Moving background pill */}
            <div
                className="absolute top-0 left-0 h-full bg-primary-variant rounded-full transition-all duration-300"
                style={{
                    width: '33.333%', // 100% divided by 3 tabs
                    left: `${activeIndex * 33.333}%`, // Move according to the active index
                }}
            />

            {/* Tab items */}
            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => setActiveIndex(index)}
                    className={`flex-1 z-10 py-2 px-2 text-sm font-outfit text-white `}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
