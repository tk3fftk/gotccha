'use strict';

Feature('ANA gotccha');

const normalGotcchaList = [
  'ANA SKY コイン',
  'ANAショッピング A-style',
  '京橋ワイン',
];

const spGotcchaList = ['ANA SKY コインSP'];

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

  for (let g of normalGotcchaList) {
    I.click(g);
    await tryTo(() => {
      I.click('1日1回チャレンジ！');
      I.waitForElement('.cp_get_cpimg', 15);
    });
    I.amOnPage('https://ana-jp.gotchamall.com/');
  }

  for (let g of spGotcchaList) {
    await tryTo(() => {
      I.click(g);
      I.click('PLAY');
      I.waitForElement('.cp_get_cpimg', 15);
    });
    I.amOnPage('https://ana-jp.gotchamall.com/');
  }

  I.wait(2);
});
