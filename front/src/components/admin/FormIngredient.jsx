import axios from "axios";
import { useRef } from "react";

const FormIngredient = (props) => {
  let name = useRef();

  const addIngredient = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        "http://127.0.0.1:3000/ingredients",
        {
          name: name.current.value,
        },
        {
          auth: {
            username: user.username,
            password: user.mdp,
          },
        }
      )
      .then(() => {
        props.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Nom de l'ingrédient
          </label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <button
          onClick={addIngredient}
          className="btn btn-success"
          type="button"
        >
          Ajouter
        </button>
      </form>
    </>
  );
};
export default FormIngredient;
