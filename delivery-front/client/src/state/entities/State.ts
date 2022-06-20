import {State as SharedState} from 'state/shared/entities/State';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
// import Cart from 'entities/Cart';
import Preferences from 'state/entities/Preferences';
import SelectedSetsInfo from 'state/entities/SelectedSetsInfo';
import {NewCartContainer} from 'state/entities/NewCart';
import Order from 'entities/Order';
import Cart from 'entities/Cart';
import Address from 'entities/Address';
// import Order from 'entities/Order';

export default interface State extends SharedState {
  cuisineList: LoadableContainer<{cuisineList: Cuisine[]}>;
  sets: LoadableContainer<{sets: Set[]}>;
  favoriteSets: LoadableContainer<{favoriteSets: Set[]}>;
  userOrders: LoadableContainer<{userOrders: Order[]}>;
  set: LoadableContainer<{set: Set}>;
  info: {
    screenInfo: string;
    selectedSetsInfo: SelectedSetsInfo[];
  };
  preferences: LoadableContainer<{preferences: Preferences}>;
  newCart: NewCartContainer;
  cartOrders: LoadableContainer<{cartOrders: Order[]}>;
  cartsList: LoadableContainer<{cartsList: Cart[]}>;
  recentAddresses: LoadableContainer<{recentAddresses: Address[]}>;
  // carts: LoadableContainer<{carts: Cart[]}>;
  // orders: LoadableContainer<{orders: Order[]}>;
}
