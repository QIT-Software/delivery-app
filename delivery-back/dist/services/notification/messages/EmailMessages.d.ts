import EmailMessage from 'services/emailSender/EmailMessage';
declare type Context = {
    text?: string;
    userName?: string;
    newPassword?: string;
    courierName?: string;
    courier?: object;
    paymentID?: string;
    comment?: string;
};
export interface NewPasswordMessage extends EmailMessage<Context> {
}
export interface SuccessRegistrationMessage extends EmailMessage<Context> {
}
export interface DocumentApprovedMessage extends EmailMessage<Context> {
}
export interface DocumentRejectedMessege extends EmailMessage<Context> {
}
export declare function createNewPasswordMessage(newPassword: string): NewPasswordMessage;
export declare function createSuccessRegistrationMessage(userName: string): SuccessRegistrationMessage;
export declare function createDocumentsApprovedMessage(courierName: string): DocumentApprovedMessage;
export declare function createDocumentsRejectedMessage(courierName: string, comment: string): DocumentRejectedMessege;
export declare function createCourierMassage(userName: string): SuccessRegistrationMessage;
export declare function createLaundryMassage(userName: string): SuccessRegistrationMessage;
export {};
