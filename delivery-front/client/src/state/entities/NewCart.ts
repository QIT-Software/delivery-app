import CreateAddressRequest from 'api/entities/CreateAddressRequest';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import Cart from 'entities/Cart';
import SelectedSetInfo from 'entities/SelectedSetsInfo';

export interface NewCart {
  clientAddress: CreateAddressRequest;
  selectedSetsInfo: SelectedSetInfo[];
}

export interface NewCartContainer {
  newCart: NewCart | undefined;
  address: CreateAddressRequest | undefined;
  distance: number | undefined;
  cart: LoadableContainer<Cart>;
}
