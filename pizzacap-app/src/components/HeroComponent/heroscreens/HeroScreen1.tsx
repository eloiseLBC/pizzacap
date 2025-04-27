import heart from '../../../assets/heart.png';
import heropic1 from '../../../assets/heropic1.png';
import heropic2 from '../../../assets/heropic2.png';
import heropic3 from '../../../assets/heropic3.png';
import { motion, stagger, useAnimate } from 'motion/react';
import Floating, {
    FloatingElement,
} from '@/fancy/components/image/parallax-floating';
import { useEffect } from 'react';

export const HeroScreen1 = () => {
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
            <div className="h-[70vh] col-span-4 grid-cols-4 grid">
                <div
                    className="flex justify-center items-center overflow-hidden col-span-1 "
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
                            className="lg:top-24 lg:left-20 top-16 left-20"
                        >
                            <motion.img
                                src={heropic1}
                                alt="Personne mangeant une pizza"
                                className="rounded-3xl lg:w-60 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                            />
                        </FloatingElement>
                        <FloatingElement
                            depth={0.5}
                            className="lg:top-96 top-80 left-20"
                        >
                            <motion.img
                                src={heropic3}
                                alt="Personnes tenant des pizzas devant leur tête"
                                className="rounded-3xl lg:w-60 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                            />
                        </FloatingElement>
                        <FloatingElement
                            depth={1}
                            className="lg:top-60 top-52 left-52 lg:left-64"
                        >
                            <motion.img
                                src={heropic2}
                                alt=""
                                className="rounded-3xl lg:w-60 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                            />
                        </FloatingElement>
                    </Floating>
                </div>
                <div className="right-0 col-span-3 pt-8 pl-32 place-content-center">
                    <div className="text-3xl text-center pb-16 pl-16 w-3/4 r-0">
                        <p>Car nous, c'est vous.</p>
                        <p>
                            <span className="highlight highlight-tertiary highlight-variant-6">
                                PizzaCap
                            </span>{' '}
                            partout où vous allez.
                        </p>
                    </div>
                    <div className="flex text-right pl-16 mr-16">
                        <p>
                            Fait avec{' '}
                            <img
                                src={heart}
                                alt="cœur"
                                className="inline text-tertiary w-4"
                            />{' '}
                            et passion depuis plus de 30 ans, PizzaCap est la
                            pizzeria indétournable de vos soirées entre ami.es,
                            votre déjeuner sur le pouce, vos dates et plus
                            encore. Chaque semaine de nouvelles offres pour vous
                            régaler.
                        </p>
                    </div>
                    <div className="text-center font-outfit font-semibold text-lg pt-10 relative  w-full">
                        <p>
                            On a tant à partager, venez découvrir la Dolce Vita
                            !
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
