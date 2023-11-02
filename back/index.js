import express from "express";
import ingredients from "./Routes/ingredients.js";
import recipes from "./Routes/recipes.js";

const app = express();
app.use("/ingredients", ingredients);
app.use("/recipes", recipes);

app.listen("3000", () => {
  console.log("run at http://127.0.0.1:3000");
});
