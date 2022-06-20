import ISetManager from 'managers/set/ISetManager';
import ISetStore from 'database/stores/set/ISetStore';
import IDishStore from 'database/stores/dish/IDishStore';
import IStatusStore from 'database/stores/status/IStatusStore';
import Set from 'entities/Set';
import SetIdAndDay from 'entities/SetIdAndDay';
import { ID } from 'entities/Common';
export default class SetManager extends ISetManager {
    private setStore;
    private dishStore;
    private statusStore;
    constructor(setStore: ISetStore, dishStore: IDishStore, statusStore: IStatusStore);
    findSetByIdOrThrow(id: string): Promise<Set>;
    getSetsByCuisineId(id: string): Promise<Set[]>;
    getSets(): Promise<Set[]>;
    getSetsByDishId(id: string): Promise<Set[]>;
    updateSet(id: string, name: string, imageId: string, priceCents: string, cuisineId: string, dishes: string[], statuses: string[]): Promise<Set>;
    createSet(name: string, imageId: string, priceCents: string, cuisineId: string, dishes: string[], statuses: string[]): Promise<void>;
    distributeSetsOfWeek(setIdsAndDays: SetIdAndDay[]): Promise<void>;
    deleteSet(setId: ID): Promise<void>;
}
