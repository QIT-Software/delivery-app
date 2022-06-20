import {State as SharedState} from 'state/shared/entities/State';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';
import {DocumentsContainer} from 'state/courier/entities/DocumentsContainer';

export default interface State extends SharedState {
  ordersList: LoadableContainer<{ordersList: Order[]}>;
  courierOrdersList: LoadableContainer<{courierOrdersList: Order[]}>;
  orderDetails: LoadableContainer<{orderDetails: Order}>;
  documents: DocumentsContainer;
}
