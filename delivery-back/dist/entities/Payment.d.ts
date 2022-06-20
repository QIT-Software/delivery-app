export declare enum RequestedPaymentStatus {
    Created = 0,
    Completed = 1
}
export interface RequestedPayment {
    orderId: string;
    redirectUrl?: string;
    status: RequestedPaymentStatus;
}
