import express from "express";
import ingredients from "./Routes/ingredients";
import recipes from "./Routes/recipes";

const app = express();
app.use("/ingredients", ingredients);
app.use("/recipes", recipes);

app.listen("3000", () => {
  console.log("run at http://127.0.0.1:3000");
});
