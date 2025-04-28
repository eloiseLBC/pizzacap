import React, { FC } from 'react';
import applePay from '../../assets/apple-pay.png';
import creditCard from '../../assets/credit-card.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';

interface FooterComponentProps {}

const FooterComponent: FC<FooterComponentProps> = () => (
    <div
        data-testid="FooterComponent"
        className="bg-surface px-8 pb-8 flex flex-col"
    >
        <div className="w-3/4 border-solid border-t-2 border-primary-variant m-auto pb-8"></div>
        <div className="h-12 flex justify-center gap-6 m-4">
            <img src={instagram} alt="Instagram Logo" className="p-1.5" />
            <img src={youtube} alt="Youtube Logo" />
            <p className="text-5xl font-sulphur font-extralight">|</p>
            <img src={applePay} alt="Apple Pay Logo" />
            <img src={creditCard} alt="Credit card Logo" />
        </div>

        <div className="justify-between flex flex-col lg:flex-row lg:items-center">
            <div className="text-center lg:text-left">
                <h4 className="font-sulphur text-3xl">Pizzerias</h4>
                <p className="font-jost italic">Héraclès</p>
                <p className="font-jost italic">Rangueil Ramonville</p>
            </div>
            <div className="flex flex-col text-center lg:text-left">
                <h4 className="font-sulphur text-3xl">Nos produits</h4>
                <a className="font-jost italic" href="">
                    Provenance
                </a>
                <a className="font-jost italic" href="">
                    Traçabilité
                </a>
            </div>
            <div className="flex flex-col text-center lg:text-left">
                <h4 className="font-sulphur text-3xl">Contact</h4>
                <a className="font-jost italic" href="">
                    02 47 17 17 17
                </a>
                <a className="font-jost italic" href="">
                    pizzacap@gmail.com
                </a>
            </div>
        </div>
        <div className="font-sulphur mt-4 text-center">
            ©Pizzacap 2025 - logos par Freepik
        </div>
    </div>
);

export default FooterComponent;
