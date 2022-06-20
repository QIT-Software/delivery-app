import {UserLocationContainer} from 'state/entities/UserAddress';
import {SessionContainer} from './Session';
import {Auth} from 'state/entities/Auth';
import {SnackBar} from 'state/entities/SnackBar';
import OrderProgressContainer from 'state/entities/OrderProgress';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Scanner from 'state/restaurant/entities/Scanner';
import {LocationContainer} from 'state/entities/LocationContainer';

export interface State {
  snackBar: SnackBar;
  session: SessionContainer;
  scanner: LoadableContainer<Scanner>;
  auth: Auth;
  address: UserLocationContainer;
  location: LocationContainer;
  orderProgress: OrderProgressContainer;
}
