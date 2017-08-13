'use strict';

import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: {
    name: 'Sudoku',
    nil: 'nil ',
    newGame: 'New Game',
    continue: 'Continue',
    restart: 'Restart',
  },
  zh: {
    name: '数独',
    nil: '无',
    newGame: '新游戏',
    continue: '继续游戏',
    restart: '重新开始',
  },
};

export default I18n;