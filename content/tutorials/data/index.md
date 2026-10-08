---
title: "データの準備とインポート"
description: "CSV形式のデータを読み込み、データパネルで確認する手順です。"
date: 2020-08-27T19:23:18+02:00
lastmod: 2020-08-27T19:23:18+02:00
draft: false
images: []
menu:
  tutorials:
    parent: "data"
weight: 20
toc: false

---

Data Illustrateurは現在、CSV（[カンマ区切り値](https://en.wikipedia.org/wiki/Comma-separated_values)）形式の表形式データをサポートしており、最初の行に列名が含まれていることを想定しています。

同じデータセットでも、ロング形式とワイド形式を持つことができます。例えば、表1は2012年夏季オリンピックのメダルテーブルのデータセットをロング形式で示しています。表2は同じデータセットのワイド形式を示しており、各メダルタイプ（金、銀、銅）が列になっています。

<!-- {{< img-simple src="long-wide-form.png" width="700px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}} -->

{{< figure src="long-wide-form.png" width="650px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}}

現在のバージョンのData Illustrateurはロング形式をサポートしています。Wikipediaには[ロング形式とワイド形式の違い](https://en.wikipedia.org/wiki/Wide_and_narrow_data)についての概要説明があります。より技術的な議論については、Hadley Wickhamによる["Tidy Data"](http://vita.had.co.nz/papers/tidy-data.pdf)のセクション3を参照してください。

<!-- データセットをインポートするには、変数ペインにある「Open Dataset File」ボタンをクリックします。Data Illustrateurは、各ファイルに短い説明を付けたサンプルデータセットのコレクションを提供しています。これらのサンプルデータセットの多くは、[ギャラリーページ](/gallery)のデモビデオで使用されています。サンプルデータセットを開き、対応するデモビデオに従って視覚化を再現することができます。 -->

独自のデータセットをインポートするには、データパネルにある「Import Data」ボタンをクリックし、ダイアログでファイルを選択します。Data Illustrateurはデータファイルを解析し、各列のデータ型を推測し、列名とサジェスチョンをデータパネルに表示します。大規模なデータセットの場合、上位500行のみが表示されます。