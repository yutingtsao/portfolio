/* ============================================
   作品集網站｜main.js
   1. 手機導覽開合
   2. 捲動進場動畫（Intersection Observer）
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* --------------------------------------------
     0. 主題切換（淺色／深色）+ 記憶
     -------------------------------------------- */
  var themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* localStorage 不可用時略過，不影響切換 */
      }
    });
  }

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
     2. 捲動進場動畫（含更講究的 stagger）
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
      runCountUp(el);
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // stagger：優先用 data-delay；若同一容器有多個相鄰 reveal，
            // 自動依序錯開，讓節奏更自然
            var delay = parseInt(el.dataset.delay, 10);
            if (isNaN(delay)) {
              delay = autoStaggerDelay(el);
            }
            setTimeout(function () {
              el.classList.add("is-visible");
              runCountUp(el);
            }, delay);
            observer.unobserve(el);
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

  // 自動 stagger：同一父層相鄰的 reveal 元素依序 +90ms
  function autoStaggerDelay(el) {
    var parent = el.parentElement;
    if (!parent) return 0;
    var siblings = Array.prototype.filter.call(
      parent.children,
      function (c) {
        return c.classList && c.classList.contains("reveal");
      }
    );
    var idx = siblings.indexOf(el);
    return idx > 0 ? idx * 90 : 0;
  }

  /* --------------------------------------------
     2b. 數字滾動遞增（Case Study 量化成果用）
     用法：<span class="count-up" data-target="40" data-suffix="%">0</span>
     元素需在 .reveal 容器內，進場時觸發
     -------------------------------------------- */
  function runCountUp(scope) {
    var nums = scope.classList && scope.classList.contains("count-up")
      ? [scope]
      : scope.querySelectorAll
        ? scope.querySelectorAll(".count-up")
        : [];

    Array.prototype.forEach.call(nums, function (numEl) {
      if (numEl.dataset.done) return;
      numEl.dataset.done = "1";

      var target = parseFloat(numEl.dataset.target || numEl.textContent) || 0;
      var prefix = numEl.dataset.prefix || "";
      var suffix = numEl.dataset.suffix || "";
      var decimals = parseInt(numEl.dataset.decimals, 10) || 0;

      if (prefersReduced) {
        numEl.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // ease-out
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = target * eased;
        numEl.textContent = prefix + current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          numEl.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }
      requestAnimationFrame(step);
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
