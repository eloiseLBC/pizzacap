import { createBrowserRouter } from "react-router-dom";
import Details from "../../views/PizzaDetailView/PizzaDetailView";
import Menu from "../../views/MenuView/MenuView";
import Home from "../../views/HomeView/HomeView";
import ErrorPage from "../../views/ErrorView/ErrorView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/details",
            element: <Details />
          },
          {
            path: "/menu",
            element: <Menu />
          }
    ]
}
]);

export default router;