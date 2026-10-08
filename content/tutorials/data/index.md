---
title: "データの準備とインポート"
title_en: "Prepare and Import Your Data"
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

<div data-i18n-ja>

Data Illustratorは現在、CSV（[カンマ区切り値](https://en.wikipedia.org/wiki/Comma-separated_values)）形式の表形式データをサポートしており、最初の行に列名が含まれていることを想定しています。

同じデータセットでも、ロング形式とワイド形式を持つことができます。例えば、表1は2012年夏季オリンピックのメダルテーブルのデータセットをロング形式で示しています。表2は同じデータセットのワイド形式を示しており、各メダルタイプ（金、銀、銅）が列になっています。

<!-- {{< img-simple src="long-wide-form.png" width="700px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}} -->

{{< figure src="long-wide-form.png" width="650px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}}

現在のバージョンのData Illustratorはロング形式をサポートしています。Wikipediaには[ロング形式とワイド形式の違い](https://en.wikipedia.org/wiki/Wide_and_narrow_data)についての概要説明があります。より技術的な議論については、Hadley Wickhamによる["Tidy Data"](http://vita.had.co.nz/papers/tidy-data.pdf)のセクション3を参照してください。

<!-- データセットをインポートするには、変数ペインにある「Open Dataset File」ボタンをクリックします。Data Illustratorは、各ファイルに短い説明を付けたサンプルデータセットのコレクションを提供しています。これらのサンプルデータセットの多くは、[ギャラリーページ](/gallery)のデモビデオで使用されています。サンプルデータセットを開き、対応するデモビデオに従って視覚化を再現することができます。 -->

独自のデータセットをインポートするには、データパネルにある「Import Data」ボタンをクリックし、ダイアログでファイルを選択します。Data Illustratorはデータファイルを解析し、各列のデータ型を推測し、列名とサジェスチョンをデータパネルに表示します。大規模なデータセットの場合、上位500行のみが表示されます。

</div>

<div data-i18n-en>

Data Illustrateur currently supports tabular data formatted as csv ([comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values)) files, with the assumption that the first row contains the column names.

The same dataset can have a long format and a wide format. For example, Table 1 shows the 2012 Summer Olympic medal table dataset in the long form. Table 2 shows a wide form of the same dataset, where each of the medal type values (Gold, Silver, Bronze) is a column.

<!-- {{< img-simple src="long-wide-form.png" width="700px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}} -->

{{< figure src="long-wide-form.png" width="650px" alt="Long vs. wide data format" caption="" class="border-0 mx-auto text-center" >}}

The current version of Data Illustrateur supports the long format. Wikipedia has a high level explanation of the [differences between long and wide forms of data](https://en.wikipedia.org/wiki/Wide_and_narrow_data). For a more technical discussion, refer to Section 3 of ["Tidy Data"](http://vita.had.co.nz/papers/tidy-data.pdf) by Hadley Wickham.

<!-- To import a dataset, click the "Open Dataset File" button in the variables pane. Data Illustrateur provides a collection of sample datasets with a short description for each file. Many of these sample datasets are used in the demo videos on [the Gallery page](/gallery). You can open a sample dataset and follow the corresponding demo video to re-create the visualization. -->

To import your own dataset, click the "Import Data" button in the Data Panel, and choose your file in the dialog. Data Illustrateur parses the data file, infers the data type for each column, and displays the column names and summaries in the Data Panel. Only the top 500 rows of data are shown for large datasets.

</div>
