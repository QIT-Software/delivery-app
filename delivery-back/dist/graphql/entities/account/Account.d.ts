import User from '../user/User';
import AdditionalUserInfo from '../user/AdditionalUserInfo';
import Preferences from '../user/Preferences';
export default class Account {
    user: User;
    info: AdditionalUserInfo;
    preferences: Preferences;
    constructor(user: User, info: AdditionalUserInfo, preferences: Preferences);
}
