import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import Details from '../../views/PizzaDetailView/PizzaDetailView';
import Menu from '../../views/MenuView/MenuView';
import Home from '../../views/HomeView/HomeView';
import ErrorPage from '../../views/ErrorView/ErrorView';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Home /> },

            {
                path: '/details/:pizzaId',
                element: <Details />,
            },
            {
                path: '/menu',
                element: <Menu />,
            },
        ]
    }
]);

export default router;