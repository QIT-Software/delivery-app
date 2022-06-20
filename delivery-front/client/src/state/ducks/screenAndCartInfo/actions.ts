import {createAction} from 'redux-actions';
import types from './types';
import Set from 'entities/Set';

export type Days = {numberOfDays: number};

export type SelectedSetsInfo = {set: Set; quantity: number};

export default {
  saveScreenInfo: createAction<string>(types.SAVE_SCREEN_INFO),
  saveSelectedSetInfo: createAction<SelectedSetsInfo[]>(types.SAVE_SELECTED_SET_INFO),
  saveNumberOfDays: createAction<Days[]>(types.SAVE_NUMBER_OF_DAYS),
};
