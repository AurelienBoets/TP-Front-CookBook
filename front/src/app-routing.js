import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import RecipeDetails from "./routes/RecipeDetails";
import Auth from "./routes/Auth";
const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);
export default router;
