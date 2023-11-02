import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/recipes")
      .then((resp) => {
        setRecipes(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
};
export default Home;
