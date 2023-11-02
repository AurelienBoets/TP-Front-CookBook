import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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
  return (
    <>
      <div className="mt-3 row">
        <div className="col-1"></div>
        <div className="col-10 bg-dark text-light p-3 rounded">
          <span className="h5">Liste des recettes</span>
          <hr />
          {recipes.map((recipe) => (
            <div className="rounded border border-info">
              <span>{recipe.name}</span>
              <hr />
              <span className="d-block">
                Temps de préparation : {recipe.prepTime} min
              </span>
              <span className="d-block">
                Temps de cuisson : {recipe.cookTime}
              </span>
              <hr />
              <span
                className="btn btn-primary"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                Détails
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
