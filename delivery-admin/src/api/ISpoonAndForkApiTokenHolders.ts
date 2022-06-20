export default interface ISpoonAndForkApiTokenHolders {
  getToken(): SpoonAndForkApiToken | undefined;
  setToken(token: SpoonAndForkApiToken | undefined): void;
}

export type SpoonAndForkApiToken = string;
