document.addEventListener("DOMContentLoaded", () => {
  console.log("chapter1.js loaded ✅");

  // 1) Hero compact
  const hero = document.getElementById("chapterHero");
  const COMPACT_AT = 80;

  const onScroll = () => {
    if (!hero) return;
    if (window.scrollY > COMPACT_AT) hero.classList.add("is-compact");
    else hero.classList.remove("is-compact");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 2) Reveal: .turn 전부에 적용..
  const turns = document.querySelectorAll(".turn");
  turns.forEach(el => el.classList.add("reveal"));

  const targets = document.querySelectorAll(".reveal");
  console.log("reveal targets:", targets.length);

  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealIO.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px"
  });

  targets.forEach(el => revealIO.observe(el));
});
