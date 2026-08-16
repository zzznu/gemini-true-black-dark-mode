// ==UserScript==
// @name         Gemini True Black Dark Mode
// @namespace    https://github.com/zzznu/gemini-true-black-dark-mode
// @version      1.3.0
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
       ここのセレクタはGeminiの実DOMに存在することを確認済み */
    html, body, main,
    chat-window,
    .conversation-container,
    .input-area-container {
      background: #000000 !important;
      background-color: #000000 !important;
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
       背後の画面と同化するため、枠線で分離する。
       クラス名はGoogleのUI更新で変わるため、変化しにくいARIAロールで指定する */
    [role="menu"],
    [role="dialog"],
    [role="listbox"],
    [role="tooltip"],
    [role="alertdialog"] {
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
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
