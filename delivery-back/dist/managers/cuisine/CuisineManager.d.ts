import ICuisineManager from 'managers/cuisine/ICuisineManager';
import ICuisineStore from 'database/stores/cuisine/ICuisineStore';
import Cuisine from 'entities/Cuisine';
import { ID } from 'entities/Common';
export default class CuisineManager extends ICuisineManager {
    private cuisineStore;
    constructor(cuisineStore: ICuisineStore);
    findCuisineByIdOrThrow(id: string): Promise<Cuisine>;
    getCuisines(): Promise<Cuisine[]>;
    getCuisinesByRestaurantId(id: string): Promise<Cuisine[]>;
    updateCuisine(id: string, imageId: string, nationality: string): Promise<Cuisine>;
    createCuisine(imageId: string, nationality: string): Promise<void>;
    deleteCuisine(cuisineId: ID): Promise<void>;
}
