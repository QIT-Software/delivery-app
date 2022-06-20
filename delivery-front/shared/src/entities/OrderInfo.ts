import Address from 'entities/Address';

export default interface OrderInfo {
  id: string;
  weight: number;
  distanceMiles: number;
  priceCents: number;
  clientAddress: Address;
}
