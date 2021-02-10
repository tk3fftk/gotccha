'use strict';

Feature('ANA gotccha');

Scenario('do gotccha', ({ I }) => {
  I.amOnPage('');
  I.see('ANA スカイ ガッチャ!モール');
  I.click('.btn-text');

  // ANAログイン
  I.fillField('cusnum', process.env.ANA_CUSNUM || 'test');
  I.fillField('logpass', process.env.ANA_PASSWORD || 'test');
  I.click('login');

  // 同意
  I.click('同意する');

  // マイリストからガチャページに飛ぶ
  I.click('ANA SKY コイン');
  // ガチャを回す処理

  I.amOnPage('https://ana-jp.gotchamall.com/');
  I.click('テイラースティッチ');
  // ガチャを回す処理

  I.amOnPage('https://ana-jp.gotchamall.com/');
  I.click('ANAショッピング A-style');
  // ガチャを(ry

  I.wait(2);
});
