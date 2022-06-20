import Ingredient from 'entities/Ingredient';

export default interface Dish {
  id: string;
  name: string;
  description: string;
  imageId: string;
  weight: string;
  kal: string;
  ingredients: Ingredient[];
}
