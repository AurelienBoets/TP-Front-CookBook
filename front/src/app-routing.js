import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
