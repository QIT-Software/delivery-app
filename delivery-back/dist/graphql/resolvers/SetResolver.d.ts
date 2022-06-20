import ISetManager from 'managers/set/ISetManager';
import Set from 'graphql/entities/set/Set';
import SetIdAndDay from 'graphql/entities/set/SetIdAndDay';
export default class SetResolver {
    private readonly setManager;
    constructor(setManager: ISetManager);
    setById(id: string): Promise<Set>;
    setsByCuisineId(id: string): Promise<Set[]>;
    getSets(): Promise<Set[]>;
    getSetsByDishId(id: string): Promise<Set[]>;
    updateSet(id: string, name: string, imageId: string, priceCents: string, cuisineId: string, dishes: string[], statuses: string[]): Promise<Set>;
    createSet(name: string, imageId: string, priceCents: string, cuisineId: string, dishes: string[], statuses: string[]): Promise<boolean>;
    distributeSetsOfWeek(setIdsAndDays: SetIdAndDay[]): Promise<boolean>;
    deleteSet(setId: string): Promise<boolean>;
}
