import {SpoonAndForkApiTokenHolders} from 'api';
import {AppType} from 'app/AppType';
import {Platform} from 'entities/Platform';

export const getHeaders = () => {
  const token = SpoonAndForkApiTokenHolders.getToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = {
    app: AppType.Admin,
    platform: Platform.Web,
  };
  if (token) {
    headers.authorization = token;
  }
  return headers;
};
