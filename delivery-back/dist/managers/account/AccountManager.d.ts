import IUserStore from 'database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import IPreferencesStore from '../../database/stores/preferences/IPreferencesStore';
export default class AccountManager implements IAccountManager {
    private userStore;
    private preferencesStore;
    constructor(userStore: IUserStore, preferencesStore: IPreferencesStore);
    getMyAccount(myUserId: string): Promise<import("../../entities/Account").default>;
    updateAccount(myUserId: string, user: {
        name: string;
        birthday: Date;
        email: string;
        phoneNumber: string;
    }): Promise<import("../../entities/Account").default>;
    updateAccountImage(myUserId: string, image: string): Promise<void>;
}
