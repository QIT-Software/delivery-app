import IUserManager from 'managers/user/IUserManager';
import IUserStore from 'database/stores/user/IUserStore';
import { ID } from 'entities/Common';
export default class UserManager extends IUserManager {
    private readonly userStore;
    constructor(userStore: IUserStore);
    updateClientInformation(id: ID, name: string, email: string, phoneNumber: string): Promise<void>;
    updateCourierInformation(id: ID, name: string, email: string, phoneNumber: string): Promise<void>;
    getClientById(id: ID): Promise<import("../../entities/Client").default>;
    getClients(): Promise<import("../../entities/Client").default[]>;
    getCourierById(id: ID): Promise<import("../../entities/Courier").default>;
    getCouriers(): Promise<import("../../entities/Courier").default[]>;
}
