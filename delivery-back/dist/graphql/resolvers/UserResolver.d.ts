import Client from 'graphql/entities/user/Client';
import Courier from 'graphql/entities/user/Courier';
import IUserManager from 'managers/user/IUserManager';
export default class UserResolver {
    private readonly userManager;
    constructor(userManager: IUserManager);
    updateClientInformation(id: string, name: string, email: string, phoneNumber: string): Promise<boolean>;
    updateCourierInformation(id: string, name: string, email: string, phoneNumber: string): Promise<boolean>;
    getCouriers(): Promise<Courier[]>;
    getCourierById(courierId: string): Promise<Courier>;
    getClients(): Promise<Client[]>;
    getClientById(clientId: string): Promise<Client>;
}
