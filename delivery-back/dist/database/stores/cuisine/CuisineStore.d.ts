import ICuisineStore from './ICuisineStore';
import Cuisine from 'database/entities/Cuisine';
import { Repository } from 'typeorm';
import Restaurant from 'database/entities/Restaurant';
export default class CuisineStore extends ICuisineStore {
    private readonly repository;
    private readonly restaurant;
    constructor(repository: Repository<Cuisine>, restaurant: Repository<Restaurant>);
    findCuisineById(id: string): Promise<Cuisine>;
    getCuisines(): Promise<Cuisine[]>;
    getCuisinesByRestaurantId(id: string): Promise<Cuisine[]>;
    getCuisinesByIds(ids: string[]): Promise<Cuisine[]>;
    updateCuisine(id: string, imageId: string, nationality: string): Promise<Cuisine>;
    createCuisine(imageId: string, nationality: string): Promise<void>;
    deleteCuisine(id: string): Promise<void>;
}
