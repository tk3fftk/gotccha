'use strict';

Feature('ANA gotccha');

const gotcchaList = [
  'ANA SKY コイン',
  'テイラースティッチ',
  'ANAショッピング A-style',
  'ANA SKY コインSP',
];

Scenario('do gotccha', async ({ I }) => {
  I.amOnPage('');
  I.see('ANA スカイ ガッチャ!モール');
  I.click('.btn-text');

  // ANAログイン
  I.fillField('cusnum', process.env.ANA_CUSNUM || 'test');
  I.fillField('logpass', process.env.ANA_PASSWORD || 'test');
  I.click('login');

  // 同意
  I.click('同意する');

  for (let g of gotcchaList) {
    I.click(g);
    // 通常ガチャ
    await tryTo(() => {
      I.click('1日1回チャレンジ！');
      I.waitForElement('.cp_get_cpimg', 15);
    });
    // SPガチャ
    await tryTo(() => {
      I.click('PLAY');
      I.waitForElement('.cp_get_cpimg', 15);
    });
    I.amOnPage('https://ana-jp.gotchamall.com/');
  }

  I.wait(2);
});
