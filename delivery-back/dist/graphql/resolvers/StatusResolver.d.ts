import IStatusManager from 'managers/status/IStatusManager';
import Status from 'graphql/entities/status/Status';
export default class IngredientResolver {
    private readonly statusManager;
    constructor(statusManager: IStatusManager);
    statusById(id: string): Promise<Status>;
    getStatuses(): Promise<Status[]>;
    ingredientById(id: string): Promise<Status>;
    ingredientsByDishId(id: string): Promise<Status[]>;
    updateStatus(id: string, imageId: string, name: string): Promise<Status>;
    createStatus(imageId: string, name: string): Promise<boolean>;
    deleteStatus(statusId: string): Promise<boolean>;
}
