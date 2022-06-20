import {createAction} from 'redux-actions';
import types from './types';
import Preferences from '../../entities/Preferences';
import UpdatePreferences from 'api/entities/UpdatePreferences';

export default {
  updatePreferences: createAction<UpdatePreferences>(types.UPDATE_PREFERENCES),
  updatePreferencesCompleted: createAction<UpdatePreferences>(
    types.UPDATE_PREFERENCES_COMPLETED,
  ),
  fetchPreferences: createAction(types.FETCH_PREFERENCES),
  fetchPreferencesCompleted: createAction<Preferences>(types.FETCH_PREFERENCES_COMPLETED),
};
