import ICuisineManager from 'managers/cuisine/ICuisineManager';
import Cuisine from 'graphql/entities/cuisine/Cuisine';
export default class CuisineResolver {
    private readonly cuisineManager;
    constructor(cuisineManager: ICuisineManager);
    cuisineById(id: string): Promise<Cuisine>;
    getCuisines(): Promise<Cuisine[]>;
    cuisinesByRestaurantId(id: string): Promise<Cuisine[]>;
    updateCuisine(id: string, imageId: string, nationality: string): Promise<Cuisine>;
    createCuisine(imageId: string, nationality: string): Promise<boolean>;
    deleteCuisine(cuisineId: string): Promise<boolean>;
}
