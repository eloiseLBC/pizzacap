import heart from '../../../assets/heart.png';
import image13 from '../../../assets/image13.png';
import image14 from '../../../assets/image14.png';
import image15 from '../../../assets/image15.png';
import image16 from '../../../assets/image16.png';
import image17 from '../../../assets/image17.png';
import image18 from '../../../assets/image18.png';
import image19 from '../../../assets/image19.png';
import { motion, stagger, useAnimate } from 'motion/react';
import Floating, {
    FloatingElement,
} from '@/fancy/components/image/parallax-floating';
import { useEffect } from 'react';

export const HeroScreen2 = () => {
    const [scope2, animate] = useAnimate();
    useEffect(() => {
        animate(
            'img',
            { opacity: [0, 1] },
            { duration: 0.5, delay: stagger(0.15) },
        );
    }, []);

    return (
        <>
            <div
                className="flex justify-center items-center overflow-hidden col-span-4 h-[70vh]"
                ref={scope2}
            >
                <FloatingElement depth={0} className="top-80 right-0">
                    <div className="w-40 h-20 bg-error relative blur-sm"></div>
                </FloatingElement>
                <FloatingElement depth={0} className="top-24 left-0">
                    <div className="w-40 h-20 bg-secondary relative blur-sm"></div>
                </FloatingElement>
                <motion.div
                    className="z-50 text-center space-y-4 items-center flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.88, delay: 1.5 }}
                ></motion.div>
                <Floating sensitivity={-1} className="">
                    <FloatingElement
                        depth={0.7}
                        className="lg:top-16 lg:left-20 top-28 left-20"
                    >
                        <motion.img
                            src={image19}
                            alt="Personne mangeant une pizza"
                            className="rounded-3xl lg:w-64  w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>

                    <FloatingElement depth={0.5} className="top-96 left-20">
                        <motion.img
                            src={image17}
                            alt="Personnes tenant des pizzas devant leur tête"
                            className="rounded-3xl lg:w-64  w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>
                    <FloatingElement depth={1} className="top-32 left-96">
                        <motion.img
                            src={image14}
                            alt=""
                            className="rounded-3xl lg:w-64 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>
                    <FloatingElement depth={1} className="top-80 right-80">
                        <motion.img
                            src={image16}
                            alt=""
                            className="rounded-3xl lg:w-64  w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>
                    <FloatingElement depth={1} className="top-60 left-52">
                        <motion.img
                            src={image15}
                            alt=""
                            className="rounded-3xl lg:w-64  w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>

                    <FloatingElement depth={1} className="top-16 right-36">
                        <motion.img
                            src={image13}
                            alt=""
                            className="rounded-3xl lg:w-64 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>
                    <FloatingElement depth={1} className="top-64 right-20">
                        <motion.img
                            src={image18}
                            alt=""
                            className="rounded-3xl lg:w-64 w-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                        />
                    </FloatingElement>
                </Floating>
            </div>
        </>
    );
};
