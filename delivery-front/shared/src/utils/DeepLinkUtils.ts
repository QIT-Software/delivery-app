import {Platform} from 'react-native';
import {ConfigService} from 'services';

export const getDeepLink = (path: string) => {
  const scheme = ConfigService.get('REACT_APP_LINKING_SCHEMA');
  const host = ConfigService.get('REACT_APP_LINKING_HOST');
  const prefix = Platform.OS === 'android' ? `${scheme}://${host}` : `${scheme}:/`;
  return `${prefix}/${path}`;
};
