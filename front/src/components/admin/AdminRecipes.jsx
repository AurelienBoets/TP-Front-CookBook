import { useEffect, useState } from "react";
import axios from "axios";

const AdminRecipes = () => {
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
  });

  const remove = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .delete(`http://127.0.0.1:3000/recipes/${id}`, {
        auth: {
          username: user.username,
          password: user.mdp,
        },
      })
      .then(() => {
        setRecipes(recipes.filter((recipe) => id !== recipe.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-1">
      <h5>Recettes</h5>
      {recipes.map((recipe) => (
        <div className="border" key={recipe.id}>
          <span>{recipe.name}</span>
          <span className="float-end btn btn-warning">Modifier</span>
          <span
            className="float-end btn btn-danger"
            onClick={() => remove(recipe.id)}
          >
            Supprimer
          </span>
        </div>
      ))}
    </div>
  );
};
export default AdminRecipes;
