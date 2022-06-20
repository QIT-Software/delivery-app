import ISetStore from './ISetStore';
import Set from 'database/entities/Set';
import { Repository } from 'typeorm';
import Cuisine from 'database/entities/Cuisine';
import Dish from 'database/entities/Dish';
import Status from 'database/entities/Status';
import ICuisineStore from 'database/stores/cuisine/ICuisineStore';
import SetIdAndDay from 'entities/SetIdAndDay';
export default class SetStore extends ISetStore {
    private readonly repository;
    private readonly cuisineRepository;
    private cuisineStore;
    constructor(repository: Repository<Set>, cuisineRepository: Repository<Cuisine>, cuisineStore: ICuisineStore);
    findSetById(id: string): Promise<Set>;
    getCuisineSets(cuisineId: string): Promise<Set[]>;
    getSets(): Promise<Set[]>;
    getSetsByDishId(dishId: string): Promise<Set[]>;
    updateSet(id: string, name: string, imageId: string, priceCents: number, cuisine: string, dishes: Dish[], statuses: Status[]): Promise<Set>;
    createSet(name: string, imageId: string, priceCents: number, cuisine: string, dishes: Dish[], statuses: Status[]): Promise<void>;
    updateSetDishes(id: string, dishes: Dish[]): Promise<void>;
    updateSetStatuses(id: string, statuses: Status[]): Promise<void>;
    addDishToSelectedSets(dish: Dish, setIds: string[]): Promise<void>;
    deleteDishFromSelectedSets(dish: Dish, setIds: string[]): Promise<void>;
    distributeSetsOfWeek(setIdsAndDays: SetIdAndDay[]): Promise<void>;
    deleteSet(id: string): Promise<void>;
}
