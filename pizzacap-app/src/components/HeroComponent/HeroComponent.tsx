import React, { act, FC } from 'react';

import { HeroScreen1 } from './heroscreens/HeroScreen1';
import { HeroScreen2 } from './heroscreens/HeroScreen2';
import { HeroScreen3 } from './heroscreens/HeroScreen3';
import { HeroNavbar } from '../HeroNavbarComponent/HeroNavbarComponent';
import { useState } from 'react';

interface HeroComponentProps {}

const HeroComponent: FC<HeroComponentProps> = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    /* const [page, setPage] = */

    return (
        <div
            data-testid="FooterComponent"
            className="bg-primary lg:h-[90vh] pb-12 relative -inset-y-3 pt-4 text-white hidden lg:grid-cols-4 gap-12 m-0 rounded-b-3xl mb-4 mt-12 lg:grid"
        >
            {activeIndex === 0 && <HeroScreen1 />}
            {activeIndex === 1 && <HeroScreen2 />}
            {activeIndex === 2 && <HeroScreen3 />}
            <div className="col-span-1" />
            <div className="col-span-2">
                <HeroNavbar
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </div>
        </div>
    );
};

export default HeroComponent;
