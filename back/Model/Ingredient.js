export class Ingredient {
  static id = 1;
  constructor(name) {
    this.id = Ingredient.id++;
    this.name = name;
  }
}
