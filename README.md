# Gemini True Black Dark Mode

Geminiのレイアウトを崩さずに、背景だけを完全な真っ黒（`#000000`）にするUserscriptです。

## 機能

- Googleが定義しているダークモードの背景色変数（`--gm3-sys-color-surface*`）を真っ黒に上書き
- サイドバー・チャット履歴・入力欄など主要な背景要素を個別に真っ黒化
- `display` / `flex` / `width` などレイアウトに関わるプロパティは一切変更しない
- 境界線を薄く残して要素の区切りが分かるように調整

## インストール

[Violentmonkey](https://violentmonkey.github.io/) や [Tampermonkey](https://www.tampermonkey.net/) を導入した上で、以下を読み込みます。

```
https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
```

## License

MIT
