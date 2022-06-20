import IAuthInfoKeeper, {
  AuthInfoKeeperDelegate,
} from '@spryrocks/react-auth/IAuthInfoKeeper';
import AuthInfoKeeper from '@spryrocks/react-auth/AuthInfoKeeper';
import {SpoonAndForkApiTokenHolders} from 'api';
import WebStorage from '@react-native-community/async-storage-backend-web';

const delegate: AuthInfoKeeperDelegate = {
  setToken: (accessToken) => {
    SpoonAndForkApiTokenHolders.setToken(accessToken);
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const webStorage = new WebStorage('idb'); // todo: remove // @ts-ignore

const authInfoKeeper: IAuthInfoKeeper = new AuthInfoKeeper(delegate, webStorage);

export {authInfoKeeper as AuthInfoKeeper};
