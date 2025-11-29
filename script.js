const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

const initTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) {
    setTheme(stored);
  } else {
    setTheme("light");
  }
};

const initScrollAnimations = () => {
  const animated = document.querySelectorAll("[data-animate]");
  if (!animated.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animated.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  animated.forEach((el) => observer.observe(el));
};

toggle?.addEventListener("click", () => {
  const current = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(current);
});

initTheme();
window.addEventListener("DOMContentLoaded", initScrollAnimations);

