import {createAction} from 'redux-actions';
import types from './types';
import Status from 'entities/Status';

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchStatuses: createAction(types.FETCH_STATUSES),
  fetchStatusesCompleted: createAction<Status[]>(types.FETCH_STATUSES_COMPLETED),
};
