// ==UserScript==
// @name         Gemini True Black Dark Mode
// @namespace    https://github.com/zzznu/gemini-true-black-dark-mode
// @version      1.1.0
// @description  Geminiのレイアウトを崩さずに背景だけを完全な真っ黒にします。
// @author       zzznu
// @license      MIT
// @match        https://gemini.google.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @noframes
// @homepageURL  https://github.com/zzznu/gemini-true-black-dark-mode
// @supportURL   https://github.com/zzznu/gemini-true-black-dark-mode/issues
// @downloadURL  https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
// @updateURL    https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
// ==/UserScript==

(function () {
  'use strict';

  // 重要なレイアウト（displayやflex、widthなど）を破壊せず、
  // 背景色（background / background-color）の変数や色指定だけを真っ黒に上書きする
  const css = `
    /* Googleが定義しているダークモードの背景色変数をハック */
    :root, body, html, [theme="dark"] {
      --gm3-sys-color-surface: #000000 !important;
      --gm3-sys-color-surface-container: #000000 !important;
      --gm3-sys-color-surface-container-low: #000000 !important;
      --gm3-sys-color-surface-container-lowest: #000000 !important;
      --gm3-sys-color-surface-container-high: #000000 !important;
      --gm3-sys-color-surface-container-highest: #000000 !important;
    }

    /* 既存のグレー背景の要素を安全に真っ黒化 */
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

    /* 境界線を少し見えやすく調整（真っ黒の中に溶け込ませる場合） */
    * {
      border-color: rgba(255, 255, 255, 0.08) !important;
    }
  `;

  GM_addStyle(css);
})();
