import fs from "fs";
import path from "path";

export class RecipeDao {
  constructor() {
    this.file = path.resolve("./Data/recipes.json");
    this.recipes = [];
  }

  readFile() {
    const file = fs.readFileSync(this.file, { encoding: "utf-8" });
    this.recipes = JSON.parse(file);
  }

  writeFile() {
    fs.writeFileSync(this.file, JSON.stringify(this.recipes));
  }

  getAll() {
    return this.recipes;
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
    this.writeFile();
  }

  getById(id) {
    this.readFile();
    return this.recipes.find((recipe) => `${recipe.id}` === id);
  }

  remove(id) {
    this.recipes = this.recipes.filter((recipe) => recipe.id != id);
    this.writeFile();
  }

  edit(newRecipe) {
    const recipe = this.getById(newRecipe.id);
    if (!recipe) {
      return false;
    }
    recipe.name = newRecipe.name;
    recipe.prepTime = newRecipe.prepTime;
    recipe.cookTime = newRecipe.cookTime;
    recipe.ingredients = newRecipe.ingredients;
    recipe.instructions = newRecipe.instructions;
    this.writeFile();
    return true;
  }
}
