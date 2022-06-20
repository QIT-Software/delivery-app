import Order from 'entities/Order';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface OrderDetailsContainer {
  order: LoadableContainer<Order>;
}
