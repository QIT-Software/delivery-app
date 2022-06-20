import ISessionStore from './ISessionStore';
import { Repository } from 'typeorm';
import Session from '../../entities/Session';
import AppType from 'entities/AppType';
import { Platform } from 'entities/Platform';
import { ID } from 'entities/Common';
export default class SessionStore extends ISessionStore {
    private readonly repository;
    constructor(repository: Repository<Session>);
    createSession(user: {
        id: string;
    }, token: string, refreshToken: string, appType: AppType, platform: Platform): Promise<Session>;
    getSession(session: {
        id: string;
    }): Promise<Session | undefined>;
    getSessionOrFail(sessionId: ID): Promise<Session>;
    getSessionByToken(token: string): Promise<Session | undefined>;
    getSessionByTokenOrThrow(token: string): Promise<Session>;
    getSessionByRefreshToken(refreshToken: string): Promise<Session | undefined>;
    updateSession(session: {
        id: string;
    }, token: string, refreshToken: string): Promise<Session>;
    updateFirebaseToken(session: {
        id: string;
    }, registrationId: string): Promise<void>;
    getUserFirebaseTokens(userId: ID, appTypes: AppType[]): Promise<string[]>;
    getUsersFirebaseTokens(userIds: ID[], appTypes: AppType[]): Promise<string[]>;
}
