import {ApolloError} from 'apollo-boost';
import ApiHttpError from '@spryrocks/react-api/rest/ApiHttpError';
import ApiError from '@spryrocks/react-api/rest/ApiError';
import {SpoonAndForkApiTokenHolder} from 'api';
import * as R from 'ramda';
import Config from 'app/Config';

export const getHeaders = () => {
  const token = SpoonAndForkApiTokenHolder.getToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = {
    app: Config.getAppType(),
    platform: Config.getPlatform(),
  };
  if (token) {
    headers.authorization = token;
  }
  return headers;
};

export const checkNotAuthorizedError = (e: ApolloError | ApiHttpError): boolean => {
  if (e instanceof ApiError) {
    return e.status === 401;
  }
  if (e.graphQLErrors) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const gqlError = R.filter((e) => e.message.statusCode === 401, e.graphQLErrors);
    return gqlError && gqlError.length > 0;
  }
  return false;
};
