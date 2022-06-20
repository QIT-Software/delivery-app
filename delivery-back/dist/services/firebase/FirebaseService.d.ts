import IFirebaseService, { NotificationOptions } from 'services/firebase/IFirebaseService';
import { ID } from 'entities/Common';
import ISessionStore from 'database/stores/session/ISessionStore';
import AppType from '../../entities/AppType';
import FirebaseNotification, { FirebaseNotificationData } from 'services/firebase/FirebaseMessage';
export default class FirebaseService extends IFirebaseService {
    private readonly sessionStore;
    constructor(sessionStore: ISessionStore);
    sendMulticastNotification<TData extends FirebaseNotificationData>(tokens: string[], message: FirebaseNotification<TData>): Promise<void>;
    sendNotificationToUser<TData extends FirebaseNotificationData>(userId: ID, message: FirebaseNotification<TData>, options: {
        appTypes: AppType[];
    }): Promise<void>;
    sendNotificationToUsers<TData extends FirebaseNotificationData>(userIds: ID[], message: FirebaseNotification<TData>, options: NotificationOptions): Promise<void>;
    private static setupNotificationMessageObject;
    private static setupDataMessageObject;
}
