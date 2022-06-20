import Restaurant from 'entities/Restaurant';
import {Bag} from 'entities/Bag';
import Set from 'entities/Set';
import User from 'entities/User';
import OrderInfo from 'entities/OrderInfo';
import Courier from 'entities/Courier';
import Cart from 'entities/Cart';

export default interface Order {
  id: string;
  number: number;
  state: OrderState;
  created: Date;
  client: User;
  placement: OrderPlacement;
  rating: string | undefined;
  orderInfo: OrderInfo;
  restaurant: Restaurant;
  restaurantId?: string | undefined;
  courierId: string | undefined;
  courier: Courier | undefined;
  bag?: Bag;
  bagId?: string;
  set: Set;
  setId: string;
  cart: Cart;
  date: Date;
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
