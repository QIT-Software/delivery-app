import {CreateAddressRequest} from 'api/graphql/types';
import SelectedSetInfo from 'entities/SelectedSetsInfo';

export default interface CreateCartRequest {
  clientAddress: CreateAddressRequest;
  selectedSetsInfo: SelectedSetInfo[];
}
