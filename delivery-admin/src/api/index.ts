import SpoonAndForkApi from './SpoonAndForkApi';
import {ISpoonAndForkApi} from './ISpoonAndForkApi';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import ApiTokenHolder from '@spryrocks/react-api/ApiTokenHolder';
import ApiDelegate from '@spryrocks/react-api/ApiDelegate';
import {createConfiguration} from './ApiConfiguration';

import {AuthInfoKeeper} from '../auth';
import {getHeaders} from './SpoonAndForkApiUtils';

const tokenHolder: IApiTokenHolder = new ApiTokenHolder();

const delegate: ApiDelegate = {
  getHeaders,
  getAuthInfo: async () => {
    const authInfo = await AuthInfoKeeper.getAuthInfo();
    if (!authInfo) return undefined;

    return {
      accessToken: authInfo.jwt,
      refreshToken: authInfo.refreshToken,
    };
  },
  updateAuthInfo: async (authInfo) => {
    await AuthInfoKeeper.update({
      jwt: authInfo.accessToken,
      refreshToken: authInfo.refreshToken,
    });
  },
};

const spoonAndForkApi: ISpoonAndForkApi = new SpoonAndForkApi(
  createConfiguration(),
  delegate,
  tokenHolder,
);

export {spoonAndForkApi as SpoonAndForkApi, tokenHolder as SpoonAndForkApiTokenHolders};
