import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import FormIngredient from "../../components/admin/FormIngredient";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([
    { ingredient: "", unit: "", quantity: "" },
  ]);
  const [isLoading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const name = useRef();
  const prepTime = useRef();
  const cookTime = useRef();
  const instructions = useRef();
  let i = 0;
  useEffect(() => {
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

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleAddSelectedIngredients = () => {
    setSelectedIngredients([
      ...selectedIngredients,
      { ingredient: "", unit: "", quantity: "" },
    ]);
  };

  const handleRemoveSelectedIngredients = (index) => {
    let list = [...selectedIngredients];
    list.splice(index, 1);
    setSelectedIngredients(list);
  };

  const handleChangeSelectedIngredients = (e, index, type) => {
    const { value } = e.target;
    const list = [...selectedIngredients];
    list[index][type] = value;
    setSelectedIngredients(list);
  };

  async function addRecipe(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const recipe = {
      name: name.current.value,
      cookTime: cookTime.current.value,
      prepTime: prepTime.current.value,
      ingredients: selectedIngredients,
      instructions: instructions.current.value,
    };

    axios
      .post("http://127.0.0.1:3000/recipes", recipe, {
        auth: {
          username: user.username,
          password: user.mdp,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="mt-3 row">
      <div className="col-1"></div>
      <div className="col-10 bg-dark text-light rounded p-3">
        <h5>{"Ajouter une recette"}</h5>
        <form onSubmit={addRecipe}>
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
          <div className="mb-2">
            <label htmlFor="ingredients" className="form-label">
              Ingrédients
            </label>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShow}
            >
              Ajouter un ingrédient
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajout ingrédient</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormIngredient close={handleClose}></FormIngredient>
              </Modal.Body>
            </Modal>
            {selectedIngredients.map((selectedIngredient, index) => (
              <div key={index}>
                <select
                  name="ingredients"
                  value={selectedIngredient.ingredient}
                  onChange={(e) =>
                    handleChangeSelectedIngredients(e, index, "ingredient")
                  }
                >
                  {ingredients.map((ingredient) => (
                    <option value={ingredient.id} key={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="quantité"
                  value={selectedIngredient.quantity}
                  onChange={(e) =>
                    handleChangeSelectedIngredients(e, index, "quantity")
                  }
                />
                <select
                  value={selectedIngredient.unit}
                  onChange={(e) =>
                    handleChangeSelectedIngredients(e, index, "unit")
                  }
                >
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
              +
            </button>
          </div>
          <div className="mb-2">
            <label htmlFor="instructions" className="form-label">
              Instructions
            </label>
            <br />
            <textarea
              ref={instructions}
              name="instructions"
              cols="80"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
