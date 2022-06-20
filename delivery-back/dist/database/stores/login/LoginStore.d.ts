import ILoginStore from './ILoginStore';
import User from '../../entities/User';
import { Repository } from 'typeorm';
import LocalLogin from '../../entities/LocalLogin';
import { ID } from 'entities/Common';
export default class LoginStore extends ILoginStore {
    private readonly repository;
    constructor(repository: Repository<LocalLogin>);
    createLocalLogin(user: User, email: string, passwordHash: string): Promise<LocalLogin>;
    getLocalLoginByEmail(email: string): Promise<LocalLogin | undefined>;
    getLocalLoginByUser(user: {
        id: ID;
    }): Promise<LocalLogin | undefined>;
    updateLocalLoginPassword(user: {
        id: string;
    }, passwordHash: string): Promise<void>;
    findLocalLoginByEmail(email: string): Promise<LocalLogin | undefined>;
}
