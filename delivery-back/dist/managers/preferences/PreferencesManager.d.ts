import IPreferencesStore from 'database/stores/preferences/IPreferencesStore';
import IPreferencesManager from './IPreferencesManager';
import IUserStore from 'database/stores/user/IUserStore';
export default class PreferencesManager implements IPreferencesManager {
    private readonly preferencesStore;
    private readonly userStore;
    constructor(preferencesStore: IPreferencesStore, userStore: IUserStore);
    updatePreferences(userId: string, allowPushNotifications?: boolean, allowEmailNotifications?: boolean, allowSmsNotifications?: boolean): Promise<import("../../entities/Preferences").default>;
    getPreferences(id: string): Promise<import("../../entities/Preferences").default>;
}
