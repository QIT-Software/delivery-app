import Address from '../address/Address';
export default class OrderInfo {
    constructor(id: string, clientAddress: Address, distanceMiles: number, priceCents: number);
    id: string;
    clientAddress: Address;
    distanceMiles?: number;
    priceCents: number;
}
