import Ingredient from 'graphql/entities/ingredient/Ingredient';
export default class Dish {
    constructor(id: string, name: string, description: string, imageId: string, weight: string, kal: string, ingredients: Ingredient[]);
    id: string;
    name: string;
    description: string;
    imageId: string;
    weight: string;
    kal: string;
    ingredients: Ingredient[];
}
