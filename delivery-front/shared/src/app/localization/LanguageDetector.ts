import * as RNLocalize from 'react-native-localize';

export default {
  getCurrentLocale: () => {
    const localeArray = RNLocalize.getLocales().map((item) => item.languageCode);
    const language = RNLocalize.findBestAvailableLanguage(localeArray);
    return language ? language.languageTag : undefined;
  },
};
