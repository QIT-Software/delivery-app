import {LoadableContainer} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';
import LatLng from 'entities/LatLng';

export default interface OrderProgressContainer {
  order: LoadableContainer<Order>;
  requestingPayment: boolean;
  requestingWashingPayment: boolean;
  courierLocation: LatLng | undefined;
}
