import { IngredientDao } from "../Dao/IngredientDao";
import express from "express";
import cors from "cors";

const ingredientsDao = new IngredientDao();
const ingredients = express.Router();
ingredients.use(express.json());
ingredients.use(cors());

ingredients.get("/", (req, res) => {
  res.status(200).send(ingredientsDao.getAll());
});

ingredients.get("/:id", (req, res) => {
  const ingredient = ingredientsDao.getById(req.params.id);
  if (ingredient) {
    res.status(200).send(ingredient);
  } else {
    res.sendStatus(404);
  }
});
