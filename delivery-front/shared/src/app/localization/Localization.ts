import i18n from 'i18next';
import LanguageDetector from './LanguageDetector';
import {logError} from 'utils/Logger';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initAsync: async (resources: any) => {
    try {
      const language = LanguageDetector.getCurrentLocale();
      if (!language) {
        if (__DEV__) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error("Can't detect language");
        }
      }

      await i18n.init({
        resources,
        fallbackLng: 'en',
        lng: language,
        keySeparator: false,
      });
    } catch (e) {
      logError(e);
    }
  },
};
