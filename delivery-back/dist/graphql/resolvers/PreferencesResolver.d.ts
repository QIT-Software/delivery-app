import IPreferencesManager from '../../managers/preferences/IPreferencesManager';
import Preferences from '../entities/user/Preferences';
import Session from '../../entities/Session';
export declare class PreferencesResolver {
    private readonly preferencesManager;
    constructor(preferencesManager: IPreferencesManager);
    updatePreferences({ userId }: Session, allowPushNotifications?: boolean, allowEmailNotifications?: boolean, allowSmsNotifications?: boolean): Promise<import("../../entities/Preferences").default>;
    preferences({ userId }: Session): Promise<Preferences>;
}
