import IDishManager from 'managers/dish/IDishManager';
import IDishStore from 'database/stores/dish/IDishStore';
import Dish from 'entities/Dish';
import IIngredientStore from 'database/stores/ingredient/IIngredientStore';
import ISetStore from 'database/stores/set/ISetStore';
import { ID } from 'entities/Common';
export default class DishManager extends IDishManager {
    private dishStore;
    private ingredientStore;
    private setStore;
    constructor(dishStore: IDishStore, ingredientStore: IIngredientStore, setStore: ISetStore);
    findDishByIdOrThrow(id: string): Promise<Dish>;
    getDishes(): Promise<Dish[]>;
    getDishesBySetId(id: string): Promise<Dish[]>;
    updateDish(id: string, imageId: string, name: string, description: string, weight: string, kal: string, ingredients: string[], sets: string[]): Promise<Dish>;
    createDish(imageId: string, name: string, description: string, weight: string, kal: string, ingredients: string[], sets: string[]): Promise<void>;
    deleteDish(dishId: ID): Promise<void>;
}
