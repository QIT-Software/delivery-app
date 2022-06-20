import { RequestedPaymentStatus } from 'entities/Payment';
export default class RequestedPayment {
    constructor(orderId: string, redirectUrl: string, status: RequestedPaymentStatus);
    orderId: string;
    redirectUrl: string | undefined;
    status: RequestedPaymentStatus;
}
