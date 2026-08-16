// ==UserScript==
// @name         Gemini True Black Dark Mode
// @namespace    https://github.com/zzznu/gemini-true-black-dark-mode
// @version      1.5.0
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
    /* Googleが定義しているダークモードの背景色変数を全段まとめて真っ黒にする。
       上位段だけ明るくして階層を表現する方法は、常時表示されている入力バーが
       同じ段を使っているため入力欄だけが浮いて見える。
       階層の区別は背景色ではなく、下のオーバーレイ用の枠線で行う。
       画面の大半はこの変数の上書きだけで黒くなる */
    :root, body, html, [theme="dark"] {
      --gm3-sys-color-surface: #000000 !important;
      --gm3-sys-color-surface-container-lowest: #000000 !important;
      --gm3-sys-color-surface-container-low: #000000 !important;
      --gm3-sys-color-surface-container: #000000 !important;
      --gm3-sys-color-surface-container-high: #000000 !important;
      --gm3-sys-color-surface-container-highest: #000000 !important;
    }

    /* 変数を経由せず直接背景色を持っている要素を個別に真っ黒化する。
       Geminiは --gm3-sys-color-* とは別に --bard-color-* という独自の変数群を
       持っており、入力まわりの色はそちらから来ているため、上の変数上書きだけでは
       黒くならない。実DOMで測った色は input-area-v2 が #1e1f20（角丸32pxのピル）、
       input-container が #0f0f0f（その背後の帯）。
       ここのセレクタはすべてGeminiの実DOMに存在することを確認済み */
    html, body, main,
    chat-window,
    .conversation-container,
    .input-area-container,
    input-container,
    input-area-v2 {
      background: #000000 !important;
      background-color: #000000 !important;
    }

    /* 入力欄を真っ黒にすると輪郭まで消えて入力位置が分からなくなるため、
       角丸に沿った細い輪郭だけ残す。完全に溶け込ませたい場合はこの規則を削る */
    input-area-v2 {
      outline: 1px solid rgba(255, 255, 255, 0.14) !important;
      outline-offset: -1px !important;
    }

    /* 全面が真っ黒になると要素の区切りが分からなくなるため、
       構造的なコンテナにだけ薄い境界線を残す。
       全称セレクタ(*)に !important を当てるとフォーカスリング・エラー表示・
       選択状態の枠まで同じ色に潰れ、さらにDOMが更新されるたびに全要素へ
       照合が走るため使わない */
    chat-window,
    .conversation-container,
    .input-area-container {
      border-color: rgba(255, 255, 255, 0.08) !important;
    }

    /* メニュー・ダイアログ・ツールチップは背景が同じ黒になると
       背後の画面と同化するため、輪郭で分離する。
       border ではなく outline を使うのは、box-sizing の指定によらず
       レイアウトに一切影響しないため。角丸にも追従する。
       主軸はGoogleのUI更新で変化しにくいARIAロール。
       あわせて実DOMで使用を確認したAngular MaterialのMDCパネルも指定する */
    [role="menu"],
    [role="dialog"],
    [role="alertdialog"],
    [role="listbox"],
    [role="tooltip"],
    .mat-mdc-menu-panel,
    .mat-mdc-dialog-surface,
    .mat-mdc-select-panel,
    .mat-mdc-autocomplete-panel,
    .mat-mdc-tooltip {
      outline: 1px solid rgba(255, 255, 255, 0.14) !important;
      outline-offset: -1px !important;
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
