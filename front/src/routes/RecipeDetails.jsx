import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/recipes/${id}`)
      .then((resp) => {
        setRecipe(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (recipe !== "") {
    return (
      <div className="mt-3 row">
        <div className="col-1"></div>
        <div className="col-10 bg-dark text-light rounded p-3">
          <h5>{recipe.name}</h5>
          <hr />
          <span className="d-block">Temps de cuisson : {recipe.cookTime}</span>
          <span className="d-block">
            Temps de préparation : {recipe.prepTime}
          </span>
          <div className="row">
            <div className="col-5">
              <span>Ingrédients</span>
              <hr />
              <ul>
                {recipe.ingredients.map((singleIngredient) => (
                  <li>
                    {singleIngredient.quantity} {singleIngredient.unit}
                    {singleIngredient.ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-5">
              <span>Instructions</span>
              <hr />
              <p>{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default RecipeDetails;
