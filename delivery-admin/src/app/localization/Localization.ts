import i18next from 'i18next';
import {logError} from 'utils/Logger';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initAsync: async (resources: any) => {
    try {
      await i18next.use(LanguageDetector).use(initReactI18next).init({
        resources,
        fallbackLng: 'en',
        debug: true,
      });
    } catch (e) {
      logError(e);
    }
  },
};
