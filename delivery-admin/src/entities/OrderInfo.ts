import Address from 'entities/Address';

export default interface OrderInfo {
  id: string;
  distanceMiles: number;
  priceCents: number;
  clientAddress: Address;
}
