import {createAction} from 'redux-actions';
import types from './types';
import {NavigateToAddressDropMenuSubmitAction} from 'state/ducks/router/actions';
import {UserLocation} from 'state/entities/UserAddress';

export default {
  confirm: createAction<{confirmAction: NavigateToAddressDropMenuSubmitAction}>(
    types.CONFIRM,
  ),
  chooseAddress: createAction<{
    location: UserLocation;
  }>(types.CHOOSE_ADDRESS),
  chooseAddressComplete: createAction(types.CHOOSE_ADDRESS_COMPLETE),
  createAddress: createAction<UserLocation>(types.CREATE_ADDRESS),
};
