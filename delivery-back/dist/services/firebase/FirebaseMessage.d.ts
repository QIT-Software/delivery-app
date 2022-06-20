export declare type FirebaseNotificationData = {
    [key: string]: string;
};
export default interface FirebaseNotification<TData extends FirebaseNotificationData> {
    title: string;
    body: string;
    data?: TData;
}
