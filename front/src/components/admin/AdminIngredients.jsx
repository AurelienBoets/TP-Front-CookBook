import axios from "axios";
import { useEffect, useState } from "react";

const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/ingredients")
      .then((resp) => {
        setIngredients(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const remove = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .delete(`http://127.0.0.1:3000/ingredients/${id}`, {
        auth: {
          username: user.username,
          password: user.mdp,
        },
      })
      .then(() => {
        setIngredients(
          ingredients.filter((ingredient) => id !== ingredient.id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-1">
      <h5>Ingrédients</h5>
      {ingredients.map((ingredient) => (
        <div className="border pb-3" key={ingredient.id}>
          <span>{ingredient.name}</span>
          <span className="float-end btn btn-warning">Modifier</span>
          <span
            className="float-end btn btn-danger"
            onClick={() => remove(ingredient.id)}
          >
            Supprimer
          </span>
        </div>
      ))}
    </div>
  );
};
export default AdminIngredients;
