// Light/dark switch (two dots, like Pax Machina's).
// Follows the system setting until the visitor picks one.
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var dots = document.querySelectorAll(".theme-dots button");
    function mark() {
      var t = current();
      dots.forEach(function (d) {
        d.classList.toggle("active", d.dataset.theme === t);
        d.setAttribute("aria-pressed", d.dataset.theme === t);
      });
    }
    mark();
    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        root.setAttribute("data-theme", d.dataset.theme);
        try { localStorage.setItem("theme", d.dataset.theme); } catch (e) {}
        mark();
      });
    });
  });
})();
