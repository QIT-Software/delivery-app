import Restaurant from 'entities/Restaurant';
import {Bag} from 'entities/Bag';
import Set from 'entities/Set';
import User from 'entities/User';
import OrderInfo from 'entities/OrderInfo';
import Courier from 'entities/Courier';
import Cart from 'entities/Cart';

export default interface Order {
  id: string;
  restaurant: Restaurant;
  client: User;
  cart: Cart;
  bag?: Bag;
  set: Set;
  orderInfo: OrderInfo;
  number: number;
  created: Date;
  placement: OrderPlacement;
  state: OrderState;
  courierId: string | undefined;
  courier: Courier | undefined;
  rating: string | undefined;
}

export enum OrderState {
  WaitingForPayment = 'WaitingForPayment',
  ReadyForDelivery = 'ReadyForDelivery',
  AcceptedByCourier = 'AcceptedByCourier',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export enum OrderPlacement {
  Client = 'Client',
  Restaurant = 'Restaurant',
}
