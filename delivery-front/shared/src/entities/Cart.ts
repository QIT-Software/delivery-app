export enum CartState {
  Active = 'Active',
  Delivered = 'Delivered',
}

export default interface Cart {
  id: string;
  userId: string;
  status: CartState;
}
