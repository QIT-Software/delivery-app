import IIngredientManager from 'managers/ingredient/IIngredientManager';
import Ingredient from 'graphql/entities/ingredient/Ingredient';
export default class IngredientResolver {
    private readonly ingredientManager;
    constructor(ingredientManager: IIngredientManager);
    ingredientById(id: string): Promise<Ingredient>;
    ingredientsByDishId(id: string): Promise<Ingredient[]>;
}
