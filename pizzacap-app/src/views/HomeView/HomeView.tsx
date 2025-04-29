import React, { FC } from 'react';
import heart from '../../assets/heart.png';
import heropic1 from '../../assets/heropic1.png';
import heropic2 from '../../assets/heropic2.png';
import L from 'leaflet';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const HeroComponent = React.lazy(
    () => import('../../components/HeroComponent/HeroComponent'),
);
import { useEffect, useState } from 'react';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';
const PizzaComponent = React.lazy(
    () => import('../../components/PizzaComponent/PizzaComponent'),
);
import allPizzasButton from '../../assets/Toutes_les_pizzas_button.png';
import { Link } from 'react-router-dom';
import firstCommentPic from '../../assets/3.png';
import secondCommentPic from '../../assets/3d_avatar_10.png';
const CustomerCommentComponent = React.lazy(
    () =>
        import(
            '../../components/CustomerCommentComponent/CustomerCommentComponent'
        ),
);
import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import logo from '../../assets/Logo_PizzaCap_Couleur.png';
import pizza from '../../assets/pizzapacman.png';

interface HomeViewProps {}

const HomeView: FC<HomeViewProps> = () => {
    const [pizzas, setPizzas] = useState<PizzaComponentProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/pizzas`,
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPizzas(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch pizzas. Please try again later.');
            }
        };
        fetchPizzas();
    }, []);

    // Liste des catégories uniques sans undefined
    const pizzasDuMoment = pizzas.filter((p) => p.tag === 'moment');
    const pizzasPopulaires = pizzas.filter((p) => p.tag === 'popular');
    return (
        <>
            <div className="lg:hidden grid grid-cols-2 gap-4 p-4 gap-x-0">
                <div className="col-span-2 flex place-content-center w-full ">
                    <img src={logo} alt="" className=" w-56 pt-6" />
                </div>
                <Link
                    to="/menu"
                    className="bg-primary-variant rounded-full w-5/6 text-center text-white mx-4 py-2  shadow-md shadow-gray-400"
                >
                    Commander
                </Link>
                <Link
                    to="/menu"
                    className="bg-primary-variant rounded-full w-5/6 text-center text-white mx-4 py-2  shadow-md shadow-gray-400"
                >
                    Offres
                </Link>
                <Link
                    to="/menu"
                    className="bg-primary-variant rounded-full w-5/6 text-center text-white mx-4 py-2  shadow-md shadow-gray-400"
                >
                    Uber & Deliveroo
                </Link>
                <Link
                    to="/menu"
                    className="bg-primary-variant rounded-full w-5/6 text-center text-white mx-4 py-2  shadow-md shadow-gray-400"
                >
                    Nous trouver
                </Link>

                <div className="col-span-2 bg-primary rounded-3xl grid grid-cols-2 p-4 gap-4 mx-4">
                    <div className="text-base text-center  text-white">
                        <p>Car nous, c'est vous.</p>
                        <p>
                            <span className="highlight highlight-tertiary highlight-variant-6">
                                PizzaCap
                            </span>{' '}
                            partout où vous allez.
                        </p>

                        <div className="flex place-content-center gap-8 pt-4">
                            <img
                                src={heropic1}
                                alt="Deux femmes partageant une pizza"
                                className="rounded-full w-12"
                            />
                            <img
                                src={heropic2}
                                alt="Deux personnes avec des parts de pizza devant le visage    "
                                className="rounded-full w-12"
                            />
                        </div>
                    </div>
                    <div className="flex text-right text-xs text-white">
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
                </div>
            </div>

            <HeroComponent />
            {/* Erreurs OU liste des pizzas */}
            {error ? (
                <div className="flex flex-col items-center justify-center mb-10 bg-gradient-to-b from-surface via-white to-surface text-center p-4">
                    <h1 className="text-5xl font-extrabold text-primary mb-6 ">
                        404: Oups, on revient
                    </h1>

                    <img
                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDM2djNrd3g2aWp5bDg0eXprMXVkamhyaXR3a3BvazQyeXAzeGpjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oFzm3VDNEGHEKdRgk/giphy.gif  "
                        alt="Error 404"
                        className="w-80 h-80 rounded-3xl mb-6 shadow-2xl"
                    />

                    <p className="text-lg text-gray-600 mb-2 max-w-md">
                        Impossible de récupérer les données
                    </p>
                </div>
            ) : (
                <>
                    <div className="px-12  mx-auto bg-surface">
                        <div className="flex flex-row justify-between align-items-center align-middle mt-12 mb-8">
                            <h2 className="font-outfit text-2xl ">
                                Pizzas du moment
                            </h2>
                            <Link to="/menu">
                                {' '}
                                <img src={pizza} alt="" className="w-10 h-10" />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4 place-items-center">
                            {pizzasDuMoment.map((pizza) => (
                                <PizzaComponent
                                    key={pizza.id}
                                    id={pizza.id}
                                    name={pizza.name}
                                    image_url={pizza.image_url}
                                    ingredients={pizza.ingredients}
                                    price={pizza.price}
                                    categorie={pizza.categorie}
                                />
                            ))}
                        </div>
                        <div className="flex flex-row justify-between align-items-center align-middle mt-12 mb-8">
                            <h2 className="font-outfit text-2xl ">
                                Pizzas populaires
                            </h2>
                            <Link to="/menu">
                                {' '}
                                <img src={pizza} alt="" className="w-10 h-10" />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4 place-items-center">
                            {pizzasPopulaires.map((pizza) => (
                                <PizzaComponent
                                    key={pizza.id}
                                    id={pizza.id}
                                    name={pizza.name}
                                    image_url={pizza.image_url}
                                    ingredients={pizza.ingredients}
                                    price={pizza.price}
                                    categorie={pizza.categorie}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="my-12 flex place-content-center">
                        <Link to="/menu" className="">
                            <img
                                src={allPizzasButton}
                                alt="Bouton vers le menu"
                            />
                        </Link>
                    </div>
                </>
            )}

            {/* TODO Carte */}
            <div className="w-2/3 mx-auto rounded-xl overflow-hidden border-4 border-primary-variant shadow-xl">
                <MapContainer
                    className="h-56 w-full rounded-xl"
                    center={[43.6490342, 1.3534217]}
                    zoom={10}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[43.60755637580316, 1.4279942515551547]} icon={redIcon}>
                        <Popup>
                            <div className="font-outfit" style={{backgroundColor: 'white',borderRadius: '10px',boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',padding: '8px 10px',fontSize: '12px',width: '180px',lineHeight: '1.3'}}>
                                <h3 style={{color: '#dc2626',fontWeight: 600,fontSize: '14px',marginBottom: '2px'}}>
                                    PizzaCap
                                </h3>
                                <p style={{ margin: 0 }}>
                                    3 Av. Paul Séjourné,
                                    <br />
                                    31000 Toulouse
                                </p>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '4px'}}>
                                    <span style={{color: '#16a34a', marginRight: '4px'}}>
                                        📞
                                    </span>
                                    <span
                                        style={{fontWeight: 500,fontSize: '12px'}}>
                                        05 61 21 24 24
                                    </span>
                                </div>
                                <p
                                    style={{color: '#16a34a',fontWeight: 500,fontSize: '12px',marginTop: '4px',marginBottom: 0}}>
                                    Ouvert de 10h à 23h
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker position={[43.59730102207966, 1.4460186961335717]} icon={redIcon}>
                        <Popup>
                        <div className="font-outfit" style={{backgroundColor: 'white',borderRadius: '10px',boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',padding: '8px 10px',fontSize: '12px',width: '180px',lineHeight: '1.3'}}>
                            <h3 style={{color: '#dc2626',fontWeight: 600,fontSize: '14px',marginBottom: '2px'}}>
                                PizzaCap
                            </h3>
                            <p style={{ margin: 0 }}>
                            26 Rue du Languedoc <br />
                            31000 Toulouse
                            </p>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '4px'}}>
                                    <span style={{color: '#16a34a', marginRight: '4px'}}>
                                        📞
                                    </span>
                                    <span
                                        style={{fontWeight: 500,fontSize: '12px'}}>
                                        05 61 21 24 24
                                    </span>
                                </div>
                                <p
                                    style={{color: '#16a34a',fontWeight: 500,fontSize: '12px',marginTop: '4px',marginBottom: 0}}>
                                    Ouvert de 10h à 23h
                                </p>
                            </div> 
                        </Popup>
                    </Marker>
                    <Marker position={[43.55470847720786, 1.4692128928243506]} icon={redIcon}>
                        <Popup>
                        <div className="font-outfit" style={{backgroundColor: 'white',borderRadius: '10px',boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',padding: '8px 10px',fontSize: '12px',width: '180px',lineHeight: '1.3'}}>
                            <h3 style={{color: '#dc2626',fontWeight: 600,fontSize: '14px',marginBottom: '2px'}}>
                                PizzaCap
                            </h3>
                            <p style={{ margin: 0 }}>
                            271 Rte de Narbonne<br />
                            31400 Rangueil
                            </p>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '4px'}}>
                                    <span style={{color: '#16a34a', marginRight: '4px'}}>
                                        📞
                                    </span>
                                    <span
                                        style={{fontWeight: 500,fontSize: '12px'}}>
                                        05 61 21 24 24
                                    </span>
                                </div>
                                <p
                                    style={{color: '#16a34a',fontWeight: 500,fontSize: '12px',marginTop: '4px',marginBottom: 0}}>
                                    Ouvert de 10h à 23h
                                </p>
                            </div> 
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="p-12 px-20 lg:grid flex flex-col gap-y-12 lg:grid-cols-2 gap-x-8">
                <div className="w-3/4 border-solid border-t-2 border-primary-variant m-auto pb-4 col-span-2"></div>
                <CustomerCommentComponent
                    name="Bob"
                    stars={5}
                    comment="Les meilleures pizzas que j'ai jamais mangé !! Merci PizzaCap !!!!"
                    image_url={firstCommentPic}
                />
                <CustomerCommentComponent
                    name="Alice"
                    stars={4}
                    comment="PizzaCap le sang"
                    image_url={secondCommentPic}
                />

                <div className=" flex col-span-2 pt-16 place-content-center gap-2">
                    <div className="w-8 bg-primary h-2 rounded-full "></div>
                    <div className="w-4 bg-primary-variant h-2 rounded-full "></div>
                    <div className="w-8 bg-primary h-2 rounded-full "></div>
                    <div className="w-8 bg-primary h-2 rounded-full "></div>
                    <div className="w-8 bg-primary h-2 rounded-full "></div>
                </div>
            </div>
        </>
    );
};
export default HomeView;
