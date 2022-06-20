import CreateAddressRequest from 'api/entities/CreateAddressRequest';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';

export interface NewOrder {
  clientAddress: CreateAddressRequest;
}

export interface NewOrderContainer {
  newOrder: NewOrder | undefined;
  address: CreateAddressRequest | undefined;
  distance: number | undefined;
  order: LoadableContainer<Order>;
  // requestingPayment: boolean;
}
