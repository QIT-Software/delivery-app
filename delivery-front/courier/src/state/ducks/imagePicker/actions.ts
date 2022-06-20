import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from 'state/ducks/router/actions';

export type addImageUri = {imageUri: string} & NavigationPayload;

export default {
  addImage: createAction<addImageUri>(types.ADD_IMAGE),
};
