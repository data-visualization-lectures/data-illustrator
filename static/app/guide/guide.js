(function () {
    "use strict";

    var SEEN_KEY = "di-guide-welcome-seen";

    var TIPS = {
        openBtn: ["Open", "保存済みの作業ファイル（.msc）を開きます。"],
        saveBtn: ["Save", "作業内容を .msc ファイルとして保存します。"],
        exportBtn: ["Export", "キャンバスを SVG として書き出します。"],
        undoBtn: ["Undo", "直前の操作を取り消します。"],
        redoBtn: ["Redo", "取り消した操作をやり直します。"],
        SelectBtn: ["Select", "図形やグループを選択して移動します。"],
        DirectSelectBtn: ["DirectSelect", "頂点など、図形の一部分を選択します。"],
        LineBtn: ["Line", "線を描きます。"],
        RectBtn: ["Rect", "長方形を描きます。Shift を押しながらだと正方形になります。"],
        EllipseBtn: ["Ellipse", "楕円を描きます。"],
        RingBtn: ["Ring", "リング（ドーナツ形）を描きます。"],
        PenBtn: ["Pen", "頂点を順にクリックして自由なパスを描きます。"],
        TextBtn: ["Text", "文字を入力します。"],
        repeatBtn: ["Repeat", "選択した図形を、データの値の数だけ複製します。"],
        divideBtn: ["Divide", "1つの図形をデータの値の数に分割します。"],
        densifyBtn: ["Densify", "線やパスに頂点を追加します。"],
        classifyBtn: ["Classify", "図形をデータの値で分類します。"],
        "AlignTopBtn": ["Align Top", "選択した図形の上端を揃えます。"],
        "AlignMiddleBtn": ["Align Middle", "選択した図形の上下中央を揃えます。"],
        "AlignBottomBtn": ["Align Bottom", "選択した図形の下端を揃えます。"],
        "AlignLeftBtn": ["Align Left", "選択した図形の左端を揃えます。"],
        "AlignCenterBtn": ["Align Center", "選択した図形の左右中央を揃えます。"],
        "AlignRightBtn": ["Align Right", "選択した図形の右端を揃えます。"],
        csvBtn: ["Import Data", "CSV ファイルを読み込みます。1行目は列名にしてください。"]
    };

    var JOIN_BTNS = ["repeatBtn", "divideBtn", "densifyBtn", "classifyBtn"];
    var DISABLED_REASON = "図形を1つ選択し、データを読み込むと使えます。";

    var SAMPLES = [
        ["縦棒グラフ", "BarChartVert"],
        ["折れ線グラフ", "LineGraph"],
        ["散布図", "Scatterplot"],
        ["円グラフ", "PieChart"],
        ["積み上げ棒グラフ", "StackedBarChart"]
    ];

    function el(tag, attrs, children) {
        var node = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (key) {
            if (key === "text") node.textContent = attrs[key];
            else node.setAttribute(key, attrs[key]);
        });
        (children || []).forEach(function (child) { node.appendChild(child); });
        return node;
    }

    function buildPanel() {
        var close = el("button", { id: "guidePanelClose", type: "button", "aria-label": "閉じる", text: "×" });
        var steps = el("ol");
        ["データを読み込む（Import Data）", "図形を描く（Rect など）", "Repeat で複製する", "インスペクタでバインドする", "Export で書き出す"].forEach(function (text) {
            steps.appendChild(el("li", { text: text }));
        });
        var links = el("ul");
        [["クイックスタート: 棒グラフを作る", "/tutorials/interface/quickstart/"],
         ["用語集", "/tutorials/interface/glossary/"],
         ["ギャラリー", "/gallery/"]].forEach(function (pair) {
            var item = el("li");
            item.appendChild(el("a", { href: pair[1], target: "_blank", rel: "noopener", text: pair[0] }));
            links.appendChild(item);
        });
        var samples = el("ul");
        SAMPLES.forEach(function (pair) {
            var item = el("li");
            var link = el("a", { href: "#", text: pair[0] });
            link.addEventListener("click", function (event) {
                event.preventDefault();
                loadProject(pair[1]);
            });
            item.appendChild(link);
            samples.appendChild(item);
        });
        var panel = el("aside", { id: "guidePanel", "aria-hidden": "true" }, [
            close,
            el("h2", { text: "使い方" }),
            el("h3", { text: "基本の流れ" }),
            steps,
            el("h3", { text: "詳しく見る" }),
            links,
            el("h3", { text: "完成例を開く" }),
            samples
        ]);
        close.addEventListener("click", function () { setPanel(false); });
        return panel;
    }

    function setPanel(open) {
        var panel = document.getElementById("guidePanel");
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", open ? "false" : "true");
        document.getElementById("guideHelpBtn").setAttribute("aria-expanded", open ? "true" : "false");
    }

    function loadProject(name) {
        var url = new URL(window.location.href);
        url.searchParams.delete("dataset");
        url.searchParams.set("project", name);
        history.pushState({}, "", url);
        window.dispatchEvent(new PopStateEvent("popstate"));
        setPanel(false);
    }

    function buildWelcome() {
        var card = el("div", { class: "guide-card" }, [
            el("h2", { text: "Data Illustrateur へようこそ" }),
            el("p", { text: "図形を描いてデータと組み合わせ、グラフを作ります。まずは完成例を開いて触ってみてください。" })
        ]);
        var actions = el("div", { class: "guide-actions" });

        var sample = el("button", { type: "button", class: "guide-primary", text: "完成例で触ってみる" });
        sample.addEventListener("click", function () {
            dismissWelcome();
            loadProject("BarChartVert");
        });

        var quickstart = el("a", {
            class: "guide-action guide-secondary",
            href: "/tutorials/interface/quickstart/",
            target: "_blank",
            rel: "noopener",
            text: "クイックスタートを見ながら作る"
        });
        quickstart.addEventListener("click", dismissWelcome);

        var blank = el("button", { type: "button", class: "guide-quiet", text: "白紙から始める" });
        blank.addEventListener("click", dismissWelcome);

        actions.appendChild(sample);
        actions.appendChild(quickstart);
        actions.appendChild(blank);
        card.appendChild(actions);

        var overlay = el("div", { id: "guideWelcome" }, [card]);
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) dismissWelcome();
        });
        return overlay;
    }

    function dismissWelcome() {
        var overlay = document.getElementById("guideWelcome");
        if (overlay) overlay.remove();
        try { localStorage.setItem(SEEN_KEY, "1"); } catch (error) { /* 記録できなくても案内自体は閉じる */ }
    }

    function shouldShowWelcome() {
        var params = new URLSearchParams(window.location.search);
        if (params.get("project") || params.get("dataset")) return false;
        try { return localStorage.getItem(SEEN_KEY) !== "1"; } catch (error) { return true; }
    }

    var tipTimer = null;
    var tipVisible = false;

    function tipFor(button) {
        var entry = TIPS[button.id];
        if (!entry) return null;
        var text = entry[1];
        if (JOIN_BTNS.indexOf(button.id) !== -1 && button.disabled) text += DISABLED_REASON;
        return { name: entry[0], text: text };
    }

    function showTip(button) {
        var info = tipFor(button);
        if (!info) return;
        var tip = document.getElementById("guideTip");
        tip.innerHTML = "";
        tip.appendChild(el("strong", { text: info.name }));
        tip.appendChild(document.createTextNode(info.text));
        var rect = button.getBoundingClientRect();
        tip.style.left = Math.min(rect.left, window.innerWidth - 276) + "px";
        tip.style.top = (rect.bottom + 8) + "px";
        tip.classList.add("is-visible");
        tipVisible = true;
    }

    function hideTip() {
        clearTimeout(tipTimer);
        tipTimer = null;
        var tip = document.getElementById("guideTip");
        tip.classList.remove("is-visible");
        tipVisible = false;
    }

    function buttonAt(event) {
        var toolbar = document.querySelector(".myToolBar");
        if (!toolbar) return null;
        var rect = toolbar.getBoundingClientRect();
        if (event.clientY < rect.top || event.clientY > rect.bottom) return null;
        var found = null;
        toolbar.querySelectorAll("button").forEach(function (button) {
            var box = button.getBoundingClientRect();
            if (event.clientX >= box.left && event.clientX <= box.right &&
                event.clientY >= box.top && event.clientY <= box.bottom) {
                found = button;
            }
        });
        return found;
    }

    var currentButton = null;

    function onPointerMove(event) {
        var button = buttonAt(event);
        if (button === currentButton) return;
        currentButton = button;
        clearTimeout(tipTimer);
        if (!button || !TIPS[button.id]) { hideTip(); return; }
        var delay = tipVisible ? 0 : 300;
        tipTimer = setTimeout(function () { showTip(button); }, delay);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var header = document.querySelector("header.navbar .container");
        var help = el("button", { id: "guideHelpBtn", type: "button", "aria-expanded": "false", "aria-controls": "guidePanel", text: "使い方" });
        help.addEventListener("click", function () {
            setPanel(!document.getElementById("guidePanel").classList.contains("is-open"));
        });
        help.style.order = "6";
        header.appendChild(help);

        document.body.appendChild(buildPanel());
        document.body.appendChild(el("div", { id: "guideTip", role: "tooltip" }));
        if (shouldShowWelcome()) {
            var overlay = buildWelcome();
            document.body.appendChild(overlay);
            requestAnimationFrame(function () { overlay.classList.add("is-open"); });
        }

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("scroll", hideTip, true);
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setPanel(false);
                if (document.getElementById("guideWelcome")) dismissWelcome();
            }
        });
    });
})();
