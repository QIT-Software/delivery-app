import FirebaseMessage from 'services/firebase/FirebaseMessage';
import Order from 'entities/Order';
import { DocumentsRevisionStatus } from 'entities/Document';
import Courier from 'entities/Courier';
declare type AcceptedByCourier = {
    action: 'acceptedByCourier';
    orderId: string;
    courierId: string;
};
declare type CheckedIn = {
    action: 'checkedIn';
    orderId: string;
    type: 'courier' | 'restaurant';
};
declare type CheckedOut = {
    action: 'checkedOut';
    orderId: string;
    type: 'courier' | 'restaurant';
};
declare type NewOrderIsAvailable = {
    action: 'newOrderIsAvailable';
    orderId: string;
};
declare type OrderCompleted = {
    action: 'orderCompleted';
    orderId: string;
};
declare type DocumentsRevisionEvaluated = {
    action: 'documentsRevisionEvaluated';
    status: DocumentsRevisionStatus;
    comment: string;
};
declare type DocumentsVerificationRequested = {
    action: 'documentsVerificationRequested';
    courierId: string;
};
export declare type NotificationData = AcceptedByCourier | CheckedIn | CheckedOut | NewOrderIsAvailable | OrderCompleted | DocumentsRevisionEvaluated | DocumentsVerificationRequested;
export declare const createNewOrderCreatedMessage: (order: Order) => FirebaseMessage<NotificationData>;
export declare const createAcceptOrderFirebaseMessage: (orderId: string, number: number, courierId: string) => FirebaseMessage<NotificationData>;
export declare const createOrderDeliveringFirebaseMessage: (order: Order, type: 'courier' | 'restaurant') => FirebaseMessage<NotificationData>;
export declare const createOrderDeliveredFirebaseMessage: (order: Order, type: 'courier' | 'restaurant') => FirebaseMessage<NotificationData>;
export declare const createOrderAcceptedByLaundryFirebaseMessage: (order: Order, type: 'courier' | 'restaurant') => FirebaseMessage<NotificationData>;
export declare const createOrderReadyToDeliveryFromLaundryFirebaseMessage: (order: Order, type: 'restaurant') => FirebaseMessage<NotificationData>;
export declare const createOrderCompletedFirebaseMessage: (order: Order) => FirebaseMessage<NotificationData>;
export declare const createDocumentsRevisionEvaluatedMessage: (status: DocumentsRevisionStatus, comment: string) => FirebaseMessage<NotificationData>;
export declare const createDocumentsVerificationRequestedMessage: (courier: Courier) => FirebaseMessage<NotificationData>;
export {};
