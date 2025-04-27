import heart from '../../../assets/heart.png';
import image21 from '../../../assets/image21.png';
import image22 from '../../../assets/image22.png';

import { motion, stagger, useAnimate } from 'motion/react';
import Floating, {
    FloatingElement,
} from '@/fancy/components/image/parallax-floating';
import { useEffect } from 'react';

export const HeroScreen3 = () => {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        animate(
            'img',
            { opacity: [0, 1] },
            { duration: 0.5, delay: stagger(0.15) },
        );
    }, []);

    return (
        <>
            <div className="h-[70vh] col-span-4 grid-cols-4 grid place-items-center">
                <div className="right-0 col-span-3 pt-4 pl-8 pr-32 place-content-left">
                    <div className="text-5xl pb-16 pl-16 w-3/4 r-0">
                        <p>
                            Chez
                            <span className="highlight highlight-tertiary highlight-variant-6">
                                PizzaCap
                            </span>
                            , chaque ingrédient raconte une histoire de goût et
                            d'engagement.
                        </p>
                    </div>
                    <div className="flex text-right pl-16 mr-32">
                        <p>
                            Notre pâte est pétrie maison avec passion, nos
                            produits certifiés Agriculture Biologique
                            garantissent une qualité irréprochable, et notre
                            viande provient exclusivement d'élevages français
                            sélectionnés avec soin. Parce qu'une bonne 🍕, c'est
                            avant tout le respect des saveurs et de ceux qui les
                            cultivent.
                        </p>
                    </div>
                </div>
                <div
                    className="flex justify-center items-center overflow-hidden col-span-1"
                    ref={scope}
                >
                    <motion.div
                        className="z-50 text-center space-y-4 items-center flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.88, delay: 1.5 }}
                    ></motion.div>
                    <Floating sensitivity={-1} className="">
                        <FloatingElement
                            depth={0.5}
                            className="lg:top-20 lg:right-20 top-12 right-20"
                        >
                            <motion.img
                                src={image21}
                                alt="Personne mangeant une pizza"
                                className="rounded-3xl lg:w-96 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                            />
                        </FloatingElement>
                        <FloatingElement depth={0.5} className="top-80 right-8">
                            <motion.img
                                src={image22}
                                alt="Personnes tenant des pizzas devant leur tête"
                                className="rounded-3xl lg:w-52 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                            />
                        </FloatingElement>
                    </Floating>
                </div>
            </div>
        </>
    );
};
