# Gemini True Black Dark Mode

Geminiのレイアウトを崩さずに、背景だけを完全な真っ黒（`#000000`）にするUserscriptです。

## 機能

- Googleが定義しているダークモードの背景色変数（`--gm3-sys-color-surface*`）を真っ黒に上書き
- サイドバー・チャット履歴・入力欄など主要な背景要素を個別に真っ黒化
- `display` / `flex` / `width` などレイアウトに関わるプロパティは一切変更しない
- CSSの注入のみで動作するため、注入後の実行コストはゼロ

## 設計上の判断

**オーバーレイの階層は完全には潰していません。**
Material Designはメニュー・ダイアログ・ツールチップを背景から浮かせるために背景色の段階（surface container）を使い分けています。これを全段まとめて `#000000` にすると、ポップアップが背景と同化して見えなくなります。そのため、オーバーレイに使われる上位2段（`-high` / `-highest`）だけ `#0a0a0a` / `#141414` とごくわずかに明るくしています。完全な単色を優先したい場合は、この2行を `#000000` に書き換えてください。

**境界線は全要素ではなく構造コンテナに限定しています。**
全称セレクタ（`*`）に `!important` で `border-color` を当てると、フォーカスリング・入力エラーの赤枠・選択状態の枠まで同じ色に潰れ、キーボード操作時に現在位置を見失います。あわせて `:focus-visible` の輪郭を明示的に確保しています。

## インストール

[Violentmonkey](https://violentmonkey.github.io/) や [Tampermonkey](https://www.tampermonkey.net/) を導入した上で、以下を読み込みます。

```
https://raw.githubusercontent.com/zzznu/gemini-true-black-dark-mode/main/gemini-true-black-dark-mode.user.js
```

## 注意

Geminiの内部クラス名・要素名を対象にしているため、Google側のUI更新で一部のセレクタが効かなくなることがあります。背景に黒くならない箇所が出た場合は、開発者ツールで該当要素のクラス名を確認して追加してください。

## License

MIT
