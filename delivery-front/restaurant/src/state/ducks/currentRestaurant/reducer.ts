import {handleActions, ReducerNextThrow} from 'redux-actions';
import {
  empty,
  failed,
  loading,
  success,
  LoadableContainer,
} from 'state/entities/LoadableContainer';
import types from './types';
import Restaurant from 'entities/Restaurant';

type ReducerState = LoadableContainer<{currentRestaurant: Restaurant}>;

const ordersFetched: ReducerNextThrow<ReducerState, {currentRestaurant: Restaurant}> = {
  next: (_, {payload}) => success({currentRestaurant: payload.currentRestaurant}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_CURRENT_RESTAURANT]: (state) => loading(state),
    [types.FETCH_CURRENT_RESTAURANT_COMPLETED]: ordersFetched,
  },
  empty(),
);
