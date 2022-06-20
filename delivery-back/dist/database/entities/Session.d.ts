import User from './User';
import AppType from 'entities/AppType';
import { Platform } from 'entities/Platform';
export default class Session {
    constructor(id: string, token: string, refreshToken: string, user: User, userId: string, appType: AppType, platform: Platform, firebaseRegistrationId: string);
    id: string;
    token: string;
    refreshToken: string;
    user: User;
    userId: string;
    appType: AppType;
    platform: Platform;
    firebaseRegistrationId?: string;
}
