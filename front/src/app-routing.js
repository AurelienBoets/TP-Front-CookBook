import { createBrowserRouter, redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import RecipeDetails from "./routes/RecipeDetails";
import Auth from "./routes/Auth";
import DashBoard from "./routes/admin/DashBoard";
import RecipeForm from "./routes/admin/RecipeForm";

const isLogged = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return redirect("/");
  } else if (user.username !== "username" && user.mdp !== "password") {
    return redirect("/");
  } else {
    return true;
  }
};

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
      {
        path: "/dashboard",
        element: <DashBoard />,
        loader: () => isLogged(),
      },
      {
        path: "/recipes/form",
        element: <RecipeForm />,
        loader: () => isLogged(),
      },
    ],
  },
]);
export default router;
