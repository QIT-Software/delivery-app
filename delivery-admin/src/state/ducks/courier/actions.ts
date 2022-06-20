import {createAction} from 'redux-actions';
import types from './types';
import Courier from 'entities/Courier';

export default {
  fetchCouriers: createAction(types.FETCH_COURIERS),
  fetchCouriersCompleted: createAction<Courier[]>(types.FETCH_COURIERS_COMPLETED),
};
