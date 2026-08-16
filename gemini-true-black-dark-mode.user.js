// ==UserScript==
// @name         Gemini True Black Dark Mode
// @namespace    https://github.com/zzznu/gemini-true-black-dark-mode
// @version      1.2.0
// @description  Geminiのレイアウトを崩さずに背景だけを完全な真っ黒にします。
// @author       zzznu
// @license      MIT
// @match        https://gemini.google.com/*
// @grant        none
// @run-at       document-start
// @noframes
// @homepageURL  https://github.com/zzznu/gemini-true-black-dark-mode
// @supportURL   https://github.com/zzznu/gemini-true-black-dark-mode/issues
// @downloadURL  https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
// @updateURL    https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
// ==/UserScript==

(function () {
  'use strict';

  // 重要なレイアウト（display や flex、width など）は一切変更せず、
  // 背景色（background / background-color）の変数と色指定だけを上書きする
  const css = `
    /* Googleが定義しているダークモードの背景色変数を上書きする。
       ただし全段を同じ黒にするとMaterial Designの重なり表現が消え、
       メニュー・ダイアログ・ツールチップが背景と同化して見えなくなるため、
       オーバーレイに使われる上位2段だけはわずかに浮かせている */
    :root, body, html, [theme="dark"] {
      --gm3-sys-color-surface: #000000 !important;
      --gm3-sys-color-surface-container-lowest: #000000 !important;
      --gm3-sys-color-surface-container-low: #000000 !important;
      --gm3-sys-color-surface-container: #000000 !important;
      --gm3-sys-color-surface-container-high: #0a0a0a !important;
      --gm3-sys-color-surface-container-highest: #141414 !important;
    }

    /* 既存のグレー背景の要素を真っ黒化 */
    html, body, main,
    .v-application,
    side-navigation,
    .left-nav-container,
    chat-window,
    .conversation-container,
    .input-area-container {
      background: #000000 !important;
      background-color: #000000 !important;
    }

    /* 入力欄（テキストエリア）周辺のグラデーションや背景の透過処理 */
    .input-area-outer-container,
    .text-input-field_placeholder {
      background-color: #000000 !important;
    }

    /* サイドバーやチャット履歴の背景 */
    .v-navigation-drawer,
    .chat-history-container {
      background-color: #000000 !important;
    }

    /* 真っ黒の中で要素の区切りが分かるよう、境界線だけ薄く残す。
       全称セレクタ(*)に !important を当てるとフォーカスリング・エラー表示・
       選択状態の枠まで同じ色に潰れ、さらにDOMが更新されるたびに全要素へ
       照合が走るため、構造的なコンテナだけに限定している */
    side-navigation,
    .left-nav-container,
    chat-window,
    .conversation-container,
    .input-area-container,
    .input-area-outer-container,
    .chat-history-container,
    .v-navigation-drawer {
      border-color: rgba(255, 255, 255, 0.08) !important;
    }

    /* 背景が真っ黒になるとフォーカス位置を見失いやすくなるため、
       キーボード操作時の輪郭を明示的に確保する */
    :focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6) !important;
      outline-offset: 2px !important;
    }
  `;

  // GM_addStyle は document-start 時点（document.head が未生成）の挙動が
  // 公式ドキュメントに明記されていないため使わない。
  // head が無い場合は documentElement に挿入すれば初回描画前に確実に適用される
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
