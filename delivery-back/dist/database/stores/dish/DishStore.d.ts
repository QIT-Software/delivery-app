import IDishStore from './IDishStore';
import Dish from 'database/entities/Dish';
import { Repository } from 'typeorm';
import Set from 'database/entities/Set';
import Ingredient from 'database/entities/Ingredient';
export default class DishStore extends IDishStore {
    private readonly repository;
    private readonly setRepository;
    private readonly ingredientRepository;
    constructor(repository: Repository<Dish>, setRepository: Repository<Set>, ingredientRepository: Repository<Ingredient>);
    findDishById(id: string): Promise<Dish | undefined>;
    findDishOrThrowById(id: string): Promise<Dish>;
    getDishes(): Promise<Dish[]>;
    getSelectedDishes(ids: string[]): Promise<Dish[]>;
    getDishesBySetIdOrFail(id: string): Promise<Dish[]>;
    updateDish(id: string, imageId: string, name: string, description: string, weight: string, kal: string, ingredients: Ingredient[]): Promise<Dish>;
    createDish(imageId: string, name: string, description: string, weight: string, kal: string, ingredients: Ingredient[]): Promise<Dish>;
    deleteDish(id: string): Promise<void>;
}
