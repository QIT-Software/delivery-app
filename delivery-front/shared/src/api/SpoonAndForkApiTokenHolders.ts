import ISpoonAndForkApiTokenHolders, {
  SpoonAndForkApiToken,
} from 'api/ISpoonAndForkApiTokenHolders';

export default class SpoonAndForkApiTokenHolders implements ISpoonAndForkApiTokenHolders {
  private token: SpoonAndForkApiToken | undefined = undefined;

  setToken(token: SpoonAndForkApiToken | undefined) {
    this.token = token;
  }

  getToken(): SpoonAndForkApiToken | undefined {
    return this.token;
  }
}
