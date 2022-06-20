import {Linking, Platform} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import IExternalService, {OpenAuthResult, OpenLinkResult} from './IExternalService';

export default class ExternalService implements IExternalService {
  // eslint-disable-next-line class-methods-use-this
  async openLink(url: string, preferInAppBrowser: boolean): Promise<OpenLinkResult> {
    if (await ExternalService.useInAppBrowser(preferInAppBrowser)) {
      try {
        return await InAppBrowser.open(url);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    await Linking.openURL(url);
    return {type: 'external'};
  }

  // eslint-disable-next-line class-methods-use-this
  async openAuth(
    url: string,
    preferInAppBrowser: boolean,
    redirectUrl: string,
  ): Promise<OpenAuthResult> {
    if (await ExternalService.useInAppBrowser(preferInAppBrowser)) {
      try {
        return await InAppBrowser.openAuth(url, redirectUrl);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(redirectUrl, {headers: {}});
    }
    await Linking.openURL(url);
    return {type: 'external'};
  }

  private static async useInAppBrowser(preferInAppBrowser: boolean): Promise<boolean> {
    return preferInAppBrowser && InAppBrowser.isAvailable();
  }

  // eslint-disable-next-line class-methods-use-this
  async openNavigator({lat, lng}: {lat: number; lng: number}): Promise<void> {
    const url = Platform.select({
      ios: `maps:${lat},${lng}?q=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}`,
    });

    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
      return;
    }

    await Linking.openURL(`https://www.google.de/maps/@${lat},${lng}?q=${lat},${lng}`);
  }

  // eslint-disable-next-line class-methods-use-this
  async call(phoneNumber: string): Promise<void> {
    const url = Platform.select({
      ios: `tel://${phoneNumber}`,
      android: `tel:${phoneNumber}`,
    });
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sendSMS(iosMessage: string, androidMessage: string) {
    const url = Platform.select({
      ios: iosMessage,
      android: androidMessage,
    });
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sendEmail(iosMessage: string, androidMessage: string) {
    const url = Platform.select({
      ios: iosMessage,
      android: androidMessage,
    });
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    }
  }
}
