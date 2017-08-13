'use strict';

import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: {
    name: 'Sudoku',
    nil: 'nil ',
  },
  zh: {
    name: '数独',
    nil: '无',
  },
};

export default I18n;