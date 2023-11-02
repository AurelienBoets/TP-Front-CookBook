import { IngredientDao } from "../Dao/IngredientDao.js";
import { Ingredient } from "../Model/Ingredient.js";
import { authMiddleware } from "../Middleware/middleware.js";
import express from "express";
import cors from "cors";

const ingredientDao = new IngredientDao();
const ingredients = express.Router();
ingredients.use(express.json());
ingredients.use(cors());

ingredients.get("/", (req, res) => {
  res.status(200).send(ingredientDao.getAll());
});

ingredients.get("/:id", (req, res) => {
  const ingredient = ingredientDao.getById(req.params.id);
  if (ingredient) {
    res.status(200).send(ingredient);
  } else {
    res.sendStatus(404);
  }
});

ingredients.post("/", authMiddleware, (req, res) => {
  const name = req.body.name;
  const ingredient = new Ingredient(name);
  ingredientDao.addIngredient(ingredient);
  res.sendStatus(201);
});

ingredients.put("/:id", authMiddleware, (req, res) => {
  let newIngredient = req.body;
  newIngredient.id = req.params.id;
  const isUpdate = ingredientDao.edit(newIngredient);
  if (isUpdate) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

ingredients.delete("/:id", authMiddleware, (req, res) => {
  ingredientDao.remove(req.params.id);
  res.sendStatus(204);
});

export default ingredients;
