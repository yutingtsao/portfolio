/* ============================================
   作品集網站｜main.js
   1. 手機導覽開合
   2. 捲動進場動畫（Intersection Observer）
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* --------------------------------------------
     1. 手機漢堡選單開合
     -------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });

    // 點擊選單連結後自動收起
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
      });
    });
  }

  /* --------------------------------------------
     2. 捲動進場動畫
     若使用者偏好減少動態，直接顯示、不觀察
     -------------------------------------------- */
  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    // 無障礙或不支援時：全部直接顯示
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // stagger：依群組內順序錯開觸發
            var delay = entry.target.dataset.delay || 0;
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------
     3. 依目前頁面標記導覽 active 狀態
     -------------------------------------------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

});
