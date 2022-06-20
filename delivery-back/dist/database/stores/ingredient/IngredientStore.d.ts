import IIngredientStore from './IIngredientStore';
import Ingredient from 'database/entities/Ingredient';
import { Repository } from 'typeorm';
import Dish from 'database/entities/Dish';
export default class IngredientStore extends IIngredientStore {
    private readonly repository;
    private readonly dish;
    constructor(repository: Repository<Ingredient>, dish: Repository<Dish>);
    findIngredientById(id: string): Promise<Ingredient | undefined>;
    getIngredientsByDishIdOrFail(id: string): Promise<Ingredient[]>;
    createIngredients(ingredienNames: string[]): Promise<Ingredient[]>;
}
