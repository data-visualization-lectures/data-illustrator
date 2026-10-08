---
title: "クイックスタート: 棒グラフを作る"
description: "サンプルデータを読み込み、図形を描き、繰り返しとバインドで棒グラフを1枚作る手順です。"
date: 2026-10-08T00:00:00+00:00
lastmod: 2026-10-08T00:00:00+00:00
draft: false
images: []
menu:
  tutorials:
    parent: "interface"
weight: 5
toc: true
---

このページでは、アメリカの四半期GDP変化率のデータ（15行）を使って、縦の棒グラフを1枚作ります。アプリは別のタブで開き、このページと並べて進めてください。

<a class="btn btn-primary btn-lg px-4" href="/app?dataset=GDP%20Change" target="_blank" rel="noopener" role="button">データを読み込んだアプリを開く</a>

読み込まれるデータは次の3列です。

| Year | Quarter | % Change |
|------|---------|----------|
| 2017 | Q1 | 2.3 |
| 2017 | Q2 | 1.7 |
| … | … | … |

## 1. データを確認する

アプリの左下にあるデータパネルに、読み込んだ表が表示されます。列名は「Year」「Quarter」「% Change」の3つです。

自分のファイルを使う場合は、データパネルの「Import Data」ボタンから CSV を読み込みます。1行目は列名にしてください。詳しくは[データの準備とインポート](../../data/)を参照してください。

## 2. 棒のもとになる長方形を描く

ツールバーの長方形ツール（Rect）を選び、キャンバス上でドラッグして小さな長方形を1つ描きます。Shift キーを押しながらドラッグすると正方形になります。

{{< rawhtml >}}
<video width=700px class="tutorial-video" controls>
    <source src="/videos/draw.mov" type="video/mp4">
</video>
{{< /rawhtml >}}

## 3. 四半期ごとに繰り返す

描いた長方形が選択された状態で、ツールバーの「Repeat」ボタンを押します。ダイアログで次のように指定します。

- データセット: GDP Change
- フィールド: Quarter

「OK」を押すと、四半期の数だけ長方形が並びます。この時点では全部同じ大きさです。

{{< rawhtml >}}
<video width=700px class="tutorial-video" controls>
    <source src="/videos/repeat.mov" type="video/mp4">
</video>
{{< /rawhtml >}}

「Repeat」ボタンが押せないときは、長方形が選択されているか、データが読み込まれているかを確認してください。両方そろって初めて押せます。

## 4. 高さをデータにバインドする

並んだ長方形のグループを選択し、右側のプロパティインスペクタを見ます。高さの横にあるバインドボタン（鎖のアイコン）を押し、列「% Change」を選びます。

長方形の高さが、それぞれの四半期の変化率に合わせて変わります。

{{< rawhtml >}}
<video width=700px class="tutorial-video" controls>
    <source src="/videos/bind.mov" type="video/mp4">
</video>
{{< /rawhtml >}}

## 5. 保存して書き出す

できあがったら、ツールバーの「Save」で作業ファイル（.msc）を保存し、「Export」で SVG として書き出せます。

## 完成例と比べてみる

同じデータで作られた完成例を開くと、軸やラベルまで入った状態を確認できます。

<a class="btn btn-outline-primary px-4" href="/app?project=BarChartVert" target="_blank" rel="noopener" role="button">完成例を開く</a>

画面の英語表記が何を指すかは[用語集](../glossary/)にまとめています。
