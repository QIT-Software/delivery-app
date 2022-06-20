import IAccountManager from '../../managers/account/IAccountManager';
import Account from '../entities/account/Account';
import Session from '../../entities/Session';
import UserUpdateRequest from 'graphql/entities/user/UserUpdateRequest';
export declare class AccountResolver {
    private readonly accountManager;
    constructor(accountManager: IAccountManager);
    myAccount({ userId }: Session): Promise<Account>;
    updateMyAccount({ userId }: Session, userInput: UserUpdateRequest): Promise<Account>;
    updateMyAccountImage({ userId }: Session, image: string): Promise<boolean>;
}
