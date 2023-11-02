import express from "express";
import cors from "cors";
import { RecipeDao } from "../Dao/RecipeDao.js";
import { Recipe } from "../Model/Recipe.js";
import { authMiddleware } from "../Middleware/middleware.js";

const recipeDao = new RecipeDao();
const recipes = express.Router();
recipes.use(cors());
recipes.use(express.json());

recipes.get("/", (req, res) => {
  res.send(recipeDao.getAll());
});

recipes.get("/:id", (req, res) => {
  const recipe = recipeDao.getById(req.params.id);
  if (recipe) {
    res.send(recipe);
  } else {
    res.sendStatus(404);
  }
});

recipes.post("/", authMiddleware, (req, res) => {
  const { name, cookTime, prepTime, instructions, ingredients } = req.body;
  let recipe = new Recipe(name, cookTime, prepTime, instructions, ingredients);
  recipeDao.addRecipe(recipe);
  res.send(recipe).status(201);
});

recipes.put("/:id", authMiddleware, (req, res) => {
  let newRecipe = req.body;
  newRecipe.id = req.params.id;
  const isUpdate = recipeDao.edit(newRecipe);
  if (isUpdate) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

recipes.delete("/:id", authMiddleware, (req, res) => {
  recipeDao.remove(req.params.id);
  res.sendStatus(204);
});

export default recipes;
