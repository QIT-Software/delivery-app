import IDishManager from 'managers/dish/IDishManager';
import Dish from 'graphql/entities/dish/Dish';
export default class DishResolver {
    private readonly dishManager;
    constructor(dishManager: IDishManager);
    dishById(id: string): Promise<Dish>;
    getDishes(): Promise<Dish[]>;
    dishesBySetId(id: string): Promise<Dish[]>;
    updateDish(id: string, name: string, description: string, weight: string, kal: string, ingredients: string[], sets: string[], imageId: string): Promise<Dish>;
    createDish(imageId: string, name: string, description: string, weight: string, kal: string, ingredients: string[], sets: string[]): Promise<boolean>;
    deleteDish(dishId: string): Promise<boolean>;
}
