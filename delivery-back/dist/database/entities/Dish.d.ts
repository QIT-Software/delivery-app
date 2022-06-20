import File from 'database/entities/File';
import Ingredient from './Ingredient';
export default class Dish {
    constructor(id: string, name: string, description: string, image: File, imageId: string, weight: string, kal: string, ingredients: Ingredient[]);
    id: string;
    name: string;
    description: string;
    image?: File;
    imageId: string;
    weight: string;
    kal: string;
    ingredients?: Ingredient[];
}
