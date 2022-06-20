import IIngredientManager from 'managers/ingredient/IIngredientManager';
import IIngredientStore from 'database/stores/ingredient/IIngredientStore';
import Ingredient from 'entities/Ingredient';
export default class IngredientManager extends IIngredientManager {
    private ingredientStore;
    constructor(ingredientStore: IIngredientStore);
    findIngredientByIdOrThrow(id: string): Promise<Ingredient>;
    getIngredientsByDishId(id: string): Promise<Ingredient[]>;
}
