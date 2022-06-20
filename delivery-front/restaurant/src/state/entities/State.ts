import {State as SharedState} from 'state/shared/entities/State';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';
import Restaurant from 'entities/Restaurant';

export default interface State extends SharedState {
  ordersList: LoadableContainer<{ordersList: Order[]}>;
  orderDetails: LoadableContainer<{orderDetails: Order}>;
  currentRestaurant: LoadableContainer<{currentRestaurant: Restaurant}>;
}
