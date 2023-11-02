export class Recipe {
  static id = 1;
  constructor(name, cookTime, prepTime, instructions, ingredients) {
    this.id = Recipe.id++;
    this.name = name;
    this.cookTime = cookTime;
    this.prepTime = prepTime;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}
