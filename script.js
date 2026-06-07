"use strict";

// =====================
// 1.ヒーロー画像の配置
// =====================
const taco = document.querySelector(".taco-main");
const foods = document.querySelectorAll(".food");
//タコス画像の横幅
const radius = taco.offsetWidth * 0.7;

foods.forEach((food, index) => {
  const angle = (360 / foods.length) * index;

  food.style.transform = `translate(-50%, -50%)
     rotate(${angle}deg)
     translate(${radius}px)
     rotate(-${angle}deg)`;
});

// =====================
// 2.ハンバーガーメニュー
// =====================
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("#nav");
const menubar = document.querySelector(".menu_bar");

//ハンバーガーボタンがクリックされたら
hamburger.onclick = function () {
  nav.classList.toggle("show"); //.showがついていないときは.showをつける。ついてるときは外す。
  menubar.classList.toggle("open"); //openでCSSでmenu_topの文字消す
};

// =====================
// 3.indexページのメニュースライダー
// =====================
const slider = document.querySelector(".slider");
const items = slider.querySelectorAll(".item");

// ① 最初の3枚をコピーして後ろに追加
items.forEach(function (item, i) {
  if (i < 3) {
    const clone = item.cloneNode(true);
    slider.appendChild(clone);
  }
});

// =====================
// 4.サブタイトルアニメーション準備
// =====================
const titles = document.querySelectorAll(".sub-title h2:not(.no-anim)");
const about = document.querySelector(".about-inner");
const newsItems = document.querySelectorAll(".news-list li");

// つかまえた各タイトルに対して、1つずつ命令を出す
titles.forEach(function (title) {
  const text = title.textContent; // 元の文字（例：「Menu」）を変数 text に覚えさせる

  title.innerHTML = ""; // いったん、画面上の文字を空っぽにする（バラバラに入れ直すため）

  // 文字をバラバラにして、1文字ずつ処理する
  text.split("").forEach(function (char, i) {
    const span = document.createElement("span"); // 新しく「span」という透明な箱を作る

    span.textContent = char; // 箱の中に、バラした文字（M や e など）を入れる

    // --- ここから下は箱の「見た目」の設定 ---
    span.style.display = "inline-block"; // 横に並ぶようにする
    span.style.opacity = "0"; // 最初は透明で見えないようにする
    span.style.transform = "translateY(30px)"; // 30px下に下げておく
    span.style.transition = "all 0.3s ease"; // 0.3秒かけて動くように設定

    // 0番目は0秒、1番目は0.2秒…と、出るタイミングを少しずつズラす
    span.style.transitionDelay = i * 0.2 + "s";

    title.appendChild(span); // 最後に、完成した箱（span）を元のタイトルの中に戻す
  });
});

// =====================
// 5.スクロール処理
// =====================
const sections = document.querySelectorAll(".sub-title");
const pageTop = document.querySelector(".page-top");
const footer = document.querySelector("footer");

// 画面がスクロールされるたびに、以下の命令をずっと繰り返す
window.onscroll = function () {
  // About表示
  const aboutRect = about.getBoundingClientRect(); // Aboutの位置を測る
  // 画面の下から100pxの位置にAboutが入ってきたら
  if (aboutRect.top < window.innerHeight - 100) {
    // まだ「show」というクラスが付いていなければ
    if (!about.classList.contains("show")) {
      about.classList.add("show"); // 「show」を付けて表示させる
    }
  }

  // タイトル表示
  sections.forEach(function (section) {
    const rect = section.getBoundingClientRect(); // セクションの位置を測る

    // 画面内にセクションが入ってきたら
    if (
      rect.top < window.innerHeight - 100 &&
      !section.classList.contains("show")
    ) {
      section.classList.add("show"); // そのセクションに「show」を付ける

      // その中にあるバラバラにした文字（span）を全部つかまえる
      const spans = section.querySelectorAll("h2 span");

      // 1文字ずつ順番に「出ておいで！」と命令する
      spans.forEach(function (span) {
        span.style.opacity = "1"; // 見えるようにする
        span.style.transform = "translateY(0)"; // 元の高さに戻す
      });
    }
  });

  // News表示
  newsItems.forEach(function (item, i) {
    const rect = item.getBoundingClientRect(); // 各ニュースの位置を測る

    // ニュースが画面に入ってきたら
    if (
      rect.top < window.innerHeight - 100 &&
      !item.classList.contains("show")
    ) {
      // 少し時間を置いてから表示させる（i * 140ミリ秒ずつズラす）
      setTimeout(function () {
        item.classList.add("show"); // 「show」を付けてふわっと出す
      }, i * 140);
    }
  });

  // ページトップボタン
  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (footerTop < windowHeight) {
    pageTop.classList.add("show"); // フッターが見えたらボタンを出す
  } else {
    pageTop.classList.remove("show"); // 見えなくなったらボタンを消す
  }
};

// =====================
// 参考にしたサイト一覧表示
// =====================
document.getElementById("sanko").onclick = function () {
  document.querySelector(".about-area").classList.toggle("show");
};
document.querySelector(".about-area").onclick = function () {
  this.classList.remove("show");
};
