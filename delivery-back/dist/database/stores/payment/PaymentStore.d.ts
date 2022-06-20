import { Repository } from 'typeorm';
import IPaymentStore from './IPaymentStore';
import IncomePayment from 'database/entities/IncomePayment';
import RequestedIncomePayment from 'database/entities/RequestedIncomePayment';
export default class PaymentStore extends IPaymentStore {
    private readonly requestedIncomePaymentRepository;
    private readonly incomePaymentRepository;
    constructor(requestedIncomePaymentRepository: Repository<RequestedIncomePayment>, incomePaymentRepository: Repository<IncomePayment>);
    createRequestedIncomePayment(paymentId: string): Promise<RequestedIncomePayment>;
    createIncomePayment(requestedPayment: {
        id: string;
    }): Promise<IncomePayment>;
}
