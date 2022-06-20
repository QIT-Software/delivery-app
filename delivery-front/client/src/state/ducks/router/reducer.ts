import {handleActions, ReducerNextThrow} from 'redux-actions';
import {
  empty,
  failed,
  loading,
  success,
  LoadableContainer,
} from 'state/entities/LoadableContainer';
import types from './types';
import Cart from 'entities/Cart';

type ReducerState = LoadableContainer<{cartsList: Cart[]}>;

const cartsFetched: ReducerNextThrow<ReducerState, {cartsList: Cart[]}> = {
  next: (_, {payload}) => success({cartsList: payload.cartsList}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.CLIENT_APP_ENTERED]: (state) => loading(state),
    [types.CLIENT_APP_ENTERED_COMPLETED]: cartsFetched,
  },
  empty(),
);
