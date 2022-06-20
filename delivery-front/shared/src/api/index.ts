import SpoonAndForkApi from './SpoonAndForkApi';
import {ISpoonAndForkApi} from './ISpoonAndForkApi';
import {createConfiguration} from './ApiConfiguration';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import ApiTokenHolder from '@spryrocks/react-api/ApiTokenHolder';
import ApiDelegate from '@spryrocks/react-api/ApiDelegate';
import {getHeaders} from './SpoonAndForkApiUtils';
import {AuthInfoKeeper} from '../auth';

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

export {spoonAndForkApi as SpoonAndForkApi, tokenHolder as SpoonAndForkApiTokenHolder};
