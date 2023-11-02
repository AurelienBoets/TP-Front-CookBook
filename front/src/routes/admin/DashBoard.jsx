import { useState } from "react";
import AdminRecipes from "../../components/admin/AdminRecipes";
import AdminIngredients from "../../components/admin/AdminIngredients";

const DashBoard = () => {
  const [bool, setBool] = useState(true);

  const toogleRecipe = () => {
    setBool(true);
  };
  const toogleIngredient = () => {
    setBool(false);
  };
  return (
    <div className="mt-3 row">
      <div className="col-1"></div>
      <div className="col-10 bg-dark text-light p-3 rounded">
        <span className="ms-1 btn btn-primary" onClick={() => toogleRecipe()}>
          Recettes
        </span>
        <span
          className="ms-2 btn btn-primary"
          onClick={() => toogleIngredient()}
        >
          Ingredients
        </span>
        {bool ? <AdminRecipes /> : <AdminIngredients />}
      </div>
    </div>
  );
};

export default DashBoard;
