import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    prepTime: "",
    cookTime: "",
    instructions: "",
    selectedIngredients: [],
  });
  const [selectedIngredients, setSelectedIngredients] = useState([
    { ingredient: "" },
  ]);
  const [isLoading, setLoading] = useState(true);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const name = useRef();
  const prepTime = useRef();
  const cookTime = useRef();
  const instructions = useRef();
  let i = 0;
  useEffect(() => {
    if (searchParam.get("mode") === "edit" && searchParam.get("id") !== "") {
      axios
        .get(`http://127.0.0.1:3000/recipes/${searchParam.get("id")}`)
        .then((resp) => {
          setRecipe(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get("http://127.0.0.1:3000/ingredients")
      .then((resp) => {
        setIngredients(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [ingredients]);

  const handleAddSelectedIngredients = (a) => {
    setSelectedIngredients([...selectedIngredients, { ingredient: a }]);
  };

  const handleRemoveSelectedIngredients = (index) => {
    let list = [...selectedIngredients];
    list.splice(index, 1);
    setSelectedIngredients(list);
    console.log(list);
  };

  const handleChangeSelectedIngredients = () => {};

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="mt-3 row">
      <div className="col-1"></div>
      <div className="col-10 bg-dark text-light rounded p-3">
        <h5>
          {searchParam.get("mode") === "edit"
            ? `Modifier la recette ${recipe.name}`
            : "Ajouter une recette"}
        </h5>
        <form>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              ref={name}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="prepTime" className="form-label">
              Temps de préparation (min)
            </label>
            <input
              type="number"
              name="prepTime"
              className="form-control"
              ref={prepTime}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="cookTime" className="form-label">
              Temps de cuisson (min)
            </label>
            <input
              type="number"
              name="cookTime"
              className="form-control"
              ref={cookTime}
            />
          </div>
          <div className="mb2">
            <label htmlFor="ingredients" className="form-label">
              Ingrédients
            </label>
            {selectedIngredients.map((selectedIngredient, index) => (
              <div key={index}>
                <select name="ingredients">
                  {ingredients.map((ingredient) => (
                    <option value={ingredient.id}>{ingredient.name}</option>
                  ))}
                </select>
                <input type="number" placeholder="quantité" />
                <select>
                  <option value="g">g</option>
                  <option value="cl">cl</option>
                  <option value="c.à soupe">c.à soupe</option>
                  <option value="c.à café">c.à café</option>
                </select>
                <button
                  className="btn btn-danger ms-1"
                  onClick={() => handleRemoveSelectedIngredients(index)}
                  type="button"
                >
                  Supprimer un ingrédient
                </button>
              </div>
            ))}
            <br />
            <button
              className="btn btn-primary"
              onClick={() => handleAddSelectedIngredients(i++)}
              type="button"
            >
              Ajouter un ingrédient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
