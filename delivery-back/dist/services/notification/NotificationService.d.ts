import INotificationService from './INotificationService';
import { ID } from 'entities/Common';
import { IEmailSenderService } from 'services/emailSender/IEmailSenderService';
import IUserStore from 'database/stores/user/IUserStore';
import Order from 'entities/Order';
import ISessionStore from 'database/stores/session/ISessionStore';
import IFirebaseService from 'services/firebase/IFirebaseService';
import Courier from 'entities/Courier';
import { DocumentsRevisionStatus } from 'entities/Document';
export default class NotificationService extends INotificationService {
    private readonly userStore;
    private readonly sessionStore;
    private readonly mailerService;
    private readonly firebaseService;
    constructor(userStore: IUserStore, sessionStore: ISessionStore, mailerService: IEmailSenderService, firebaseService: IFirebaseService);
    sendRegistrationMessage(userName: string, email: string): Promise<void>;
    sendNewPassword(userId: ID, password: string): Promise<void>;
    sendDocumentsApprovedMessage(userId: ID): Promise<void>;
    sendDocumentsDocumentsRejectedMessage(userId: ID, comment: string): Promise<void>;
    sendCreatedANewCourierMassage(userName: string): Promise<void>;
    sendCreatedANewRestaurantMassage(userName: string): Promise<void>;
    sendOrderAccepted(order: Order, type: 'courier', courier: {
        id: ID;
    }): Promise<void>;
    sendNewOrderCreated(order: Order): Promise<void>;
    sendMarkOrder(order: Order, type: 'client' | 'courier' | 'restaurant'): Promise<void>;
    sendDocumentsRevisionEvaluated(courier: Courier, status: DocumentsRevisionStatus, comment: string): Promise<void>;
    sendDocumentsVerificationRequested(courier: Courier): Promise<void>;
}
