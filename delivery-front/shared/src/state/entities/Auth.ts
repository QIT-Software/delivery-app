import CreateAddressRequest from 'api/entities/CreateAddressRequest';

export interface Auth {
  isChecking: boolean;
  isBusy: boolean;
  isLoading: boolean;
  address: undefined | CreateAddressRequest;
}
