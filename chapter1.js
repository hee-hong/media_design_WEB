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
// ===== Chapter 1 Scroll Frame Animation (9 frames) =====
(() => {
  const container = document.getElementById("c1-scrollAnim");
  const img = document.getElementById("c1AnimImg");
  if (!container || !img) return;

  const frames = [
    "c1_anim_01.png",
    "c1_anim_02.png",
    "c1_anim_03.png",
    "c1_anim_04.png",
    "c1_anim_05.png",
    "c1_anim_06.png",
    "c1_anim_07.png",
    "c1_anim_08.png",
    "c1_anim_09.png",
  ];

  // 프리로드(9장이라 가볍게 가능)
  frames.forEach((src) => {
    const i = new Image();
    i.src = src;
  });

  let lastIndex = -1;
  let ticking = false;

  function updateFrame() {
    const rect = container.getBoundingClientRect();
    const viewH = window.innerHeight;

    const total = rect.height - viewH;
    const raw = total <= 0 ? 1 : (-rect.top / total);
    const progress = Math.min(1, Math.max(0, raw));

    const idx = Math.round(progress * (frames.length - 1));

    if (idx !== lastIndex) {
      img.src = frames[idx];
      lastIndex = idx;
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateFrame);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateFrame();
})();



// =========================
// Next Story: show at page end
// =========================
(() => {
  const next = document.getElementById("nextStory");
  if (!next) return;

  const showAt = 0.92; // 페이지 92% 지점에서 등장

  function onScroll(){
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;

    const progress = (scrollY + viewH) / docH;

    if (progress >= showAt) {
      next.classList.add("is-visible");
    } else {
      next.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
