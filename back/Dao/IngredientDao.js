import fs from "fs";
import path from "path";

export class IngredientDao {
  constructor() {
    this.file = path.resolve("./Data/ingredients.json");
    this.ingredients = [];
  }

  readFile() {
    const file = fs.readFileSync(this.file, { encoding: "utf-8" });
    this.ingredients = JSON.parse(file);
  }

  writeFile() {
    fs.writeFileSync(this.file, JSON.stringify(this.ingredients));
  }

  getAll() {
    return this.ingredients;
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.writeFile();
  }

  getById(id) {
    this.readFile();
    return this.ingredients.find((ingredient) => `${ingredient.id}` === id);
  }

  remove(id) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id != id
    );
    this.writeFile();
  }

  edit(newIngredient) {
    const ingredient = this.getById(newIngredient.id);
    if (!ingredient) {
      return false;
    }
    ingredient.name = newIngredient.name;
    ingredient.prepTime = newIngredient.prepTime;
    ingredient.cookTime = newIngredient.cookTime;
    ingredient.ingredients = newIngredient.ingredients;
    ingredient.instructions = newIngredient.instructions;
    this.writeFile();
    return true;
  }
}
