import {handleActions} from 'redux-actions';
import types from './types';
import Cart from 'state/entities/SelectedSetsInfo';

type ReducerState = {
  screenInfo: string;
  selectedSetsInfo: Cart[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.SAVE_SCREEN_INFO]: (state, {payload}) => ({...state, screenInfo: payload}),
    [types.SAVE_SELECTED_SET_INFO]: (state, {payload}) => ({
      ...state,
      selectedSetsInfo: payload,
    }),
    [types.SAVE_NUMBER_OF_DAYS]: (state, {payload}) => ({
      ...state,
      numberOfDays: payload,
    }),
  },
  {
    screenInfo: 'main',
    selectedSetsInfo: [],
  },
);
