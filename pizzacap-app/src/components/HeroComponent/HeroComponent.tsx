import React, { FC } from 'react';
import heart from '../../assets/heart.png';

interface HeroComponentProps {}

const HeroComponent: FC<HeroComponentProps> = () => (
    <div
        data-testid="FooterComponent"
        className="bg-primary px-8 pb-8 text-white grid"
    >
        <div className="col-span-1"></div>
        <div className="w- right-0 col-span-2">
            <div className="text-5xl">
                <p>Car nous, c'est vous.</p>
                <p>PizzaCap partout où vous allez.</p>
            </div>
            <p className="inline-block">
                <img className="h-1 p-2" src={heart} alt="coeur" />
                et passion depuis plus de 30 ans, PizzaCap est la pizzeria
                indétournable de vos soirées entre ami.es, votre déjeuner sur le
                pouce, vos dates et plus encore. Chaque semaine de nouvelles
                offres pour vous régaler.
            </p>
        </div>
    </div>
);

export default HeroComponent;
