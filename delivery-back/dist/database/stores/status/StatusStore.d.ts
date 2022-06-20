import IStatusStore from './IStatusStore';
import Status from 'database/entities/Status';
import { Repository } from 'typeorm';
import Set from 'database/entities/Set';
export default class StatusStore extends IStatusStore {
    private readonly repository;
    private readonly setRepository;
    constructor(repository: Repository<Status>, setRepository: Repository<Set>);
    findStatusById(id: string): Promise<Status | undefined>;
    findStatusByIdOrThrow(id: string): Promise<Status>;
    getStatusesBySetIdOrFail(id: string): Promise<Status[]>;
    getStatuses(): Promise<Status[]>;
    getSelectedStatuses(ids: string[]): Promise<Status[]>;
    updateStatus(id: string, imageId: string, name: string): Promise<Status>;
    createStatus(imageId: string, name: string): Promise<void>;
    deleteStatus(id: string): Promise<void>;
}
