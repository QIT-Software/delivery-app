import SecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import IAuthInfoKeeper from './IAuthInfoKeeper';
import Session from './Session';
import {SpoonAndForkApiTokenHolder} from 'api';

export default class AuthInfoKeeper implements IAuthInfoKeeper {
  private static readonly KEY_SESSION = 'KEY_SESSION';

  public async isAuthenticated() {
    return !!(await this.getAuthInfo());
  }

  public authenticate = async (resp: Session) => {
    const json = JSON.stringify(resp);
    await SecureStorage.set(AuthInfoKeeper.KEY_SESSION, json, {
      accessible: ACCESSIBLE.ALWAYS,
    });
    SpoonAndForkApiTokenHolder.setToken(resp.jwt);
  };

  public update = async (resp: Session) => {
    await this.authenticate(resp);
  };

  public getAuthInfo = async () => {
    const tokenExists = await SecureStorage.exists(AuthInfoKeeper.KEY_SESSION);
    if (tokenExists) {
      const json = await SecureStorage.get(AuthInfoKeeper.KEY_SESSION);
      if (!json) return;
      const session: Session = JSON.parse(json);
      return session;
    }
    return undefined;
  };

  public reset = async () => {
    await SecureStorage.remove(AuthInfoKeeper.KEY_SESSION);
    SpoonAndForkApiTokenHolder.setToken(undefined);
  };

  private syncApiToken = async () => {
    const authInfo = await this.getAuthInfo();
    if (authInfo) {
      SpoonAndForkApiTokenHolder.setToken(authInfo.jwt);
    } else {
      SpoonAndForkApiTokenHolder.setToken(undefined);
    }
  };

  public async initialize() {
    await this.syncApiToken();
  }
}
