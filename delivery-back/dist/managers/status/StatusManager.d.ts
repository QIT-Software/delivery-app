import IStatusManager from 'managers/status/IStatusManager';
import IStatusStore from 'database/stores/status/IStatusStore';
import Status from 'entities/Status';
import { ID } from 'entities/Common';
export default class StatusManager extends IStatusManager {
    private statusStore;
    constructor(statusStore: IStatusStore);
    findStatusByIdOrThrow(id: string): Promise<Status>;
    getStatusesBySetId(id: string): Promise<Status[]>;
    getStatuses(): Promise<Status[]>;
    updateStatus(id: string, imageId: string, name: string): Promise<Status>;
    createStatus(imageId: string, name: string): Promise<void>;
    deleteStatus(statusId: ID): Promise<void>;
}
