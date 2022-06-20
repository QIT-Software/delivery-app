import { Repository } from 'typeorm';
import IPreferencesStore from './IPreferencesStore';
import { ID } from 'entities/Common';
import Preferences from '../../entities/Preferences';
import User from '../../entities/User';
export default class PreferencesStore extends IPreferencesStore {
    private readonly repository;
    private readonly userRepository;
    constructor(repository: Repository<Preferences>, userRepository: Repository<User>);
    createPreferences(allowPushNotifications: boolean, allowEmailNotifications: boolean, allowSmsNotifications: boolean): Promise<Preferences>;
    getPreferences(id: string): Promise<Preferences | undefined>;
    updatePreferences(userId: string, allowPushNotifications?: boolean, allowEmailNotifications?: boolean, allowSmsNotifications?: boolean): Promise<Preferences>;
    getPreferencesOrFail(preferencesId: ID): Promise<Preferences>;
}
