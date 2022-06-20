import RequestedIncomePayment from 'database/entities/RequestedIncomePayment';
export default class IncomePayment {
    constructor(id: string, created: Date, requestedPayment: RequestedIncomePayment);
    id: string;
    created: Date;
    requestedPayment?: RequestedIncomePayment;
}
