export type OpenLinkResultType = 'cancel' | 'dismiss' | 'external';
export type OpenLinkResult = {
  type: OpenLinkResultType;
};
export type OpenAuthResult =
  | OpenLinkResult
  | {
      type: 'success';
      url: string;
    };

export default interface IExternalService {
  openLink(url: string, preferInAppBrowser: boolean): Promise<OpenLinkResult>;

  openAuth(
    url: string,
    preferInAppBrowser: boolean,
    redirectUrl: string,
  ): Promise<OpenAuthResult>;

  openNavigator(latLng: {lat: number; lng: number}): Promise<void>;

  call(phoneNumber: string): Promise<void>;

  sendSMS(iosMessage: string, androidMessage: string): Promise<void>;

  sendEmail(iosMessage: string, androidMessage: string): Promise<void>;
}
