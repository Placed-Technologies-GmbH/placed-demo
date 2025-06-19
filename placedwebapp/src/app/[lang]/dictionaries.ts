import 'server-only';

const dictionaries = {
  en: async () => {
    const [common, searchTranslations, jobDetailsTranslations] = await Promise.all([
      import('@/locales/en/common.json').then((module) => module.default),
      import('@/locales/en/search.json').then((module) => module.default),
      import('@/locales/en/jobdetails.json').then((module) => module.default),
    ]);
    return { ...common, searchPage: searchTranslations, jobDetailsPage: jobDetailsTranslations };
  },
  de: async () => {
    const [common, searchTranslations, jobDetailsTranslations] = await Promise.all([
      import('@/locales/de/common.json').then((module) => module.default),
      import('@/locales/de/search.json').then((module) => module.default),
      import('@/locales/de/jobdetails.json').then((module) => module.default),
    ]);
    return { ...common, searchPage: searchTranslations, jobDetailsPage: jobDetailsTranslations  };
  },
};

export const getDictionary = async (locale: 'en' | 'de') => {
  console.log('getDictionary called with locale:', locale);
  
  if (!locale || !dictionaries[locale]) {
    console.error('Invalid locale or dictionary not found:', locale);
    // Default to English if locale is invalid
    return dictionaries.en();
  }
  
  return dictionaries[locale]();
}; 