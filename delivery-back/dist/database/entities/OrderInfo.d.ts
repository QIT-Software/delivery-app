import Address from './Address';
export default class OrderInfo {
    constructor(id: string, priceCents: number, distanceMiles: number, clientAddress: Address);
    id: string;
    priceCents: number;
    distanceMiles?: number;
    clientAddress: Address;
}
