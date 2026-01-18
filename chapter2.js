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

  // 2) Reveal: .turn 전부에 적용(HTML 수정 필요 없음)
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

// ===== Scroll Frame Animation (6 frames) =====
(() => {
  const container = document.getElementById("c3-scrollAnim");
  const img = document.getElementById("c3AnimImg");
  if (!container || !img) return;

  // ✅ 네 파일명에 맞춰 수정 가능
  const frames = [
    "c3_anim_01.png",
    "c3_anim_02.png",
    "c3_anim_03.png",
    "c3_anim_04.png",
    "c3_anim_05.png",
    "c3_anim_06.png",
  ];

  // 가벼운 프리로드 (6장이라 부담 없음)
  frames.forEach((src) => {
    const i = new Image();
    i.src = src;
  });

  let lastIndex = -1;
  let ticking = false;

  function updateFrame() {
    const rect = container.getBoundingClientRect();
    const viewH = window.innerHeight;

    // container가 화면에서 지나가는 전체 진행도 계산
    // rect.top: 0 ~ -containerHeight (스크롤됨)
    const total = rect.height - viewH;
    const raw = total <= 0 ? 1 : (-rect.top / total); // 0~1
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


// ===== Chapter 2 Scroll Frame Animation (7 frames) =====
(() => {
  const container = document.getElementById("c2-scrollAnim");
  const img = document.getElementById("c2AnimImg");
  if (!container || !img) return;

  const frames = [
    "c2_anim_01.png",
    "c2_anim_02.png",
    "c2_anim_03.png",
    "c2_anim_04.png",
    "c2_anim_05.png",
    "c2_anim_06.png",
    "c2_anim_07.png",
  ];

  // 프리로드
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


// ===== Chapter 2 Scroll Animation =====
(() => {
  const container = document.getElementById("c2-scrollAnim-2");
  const img = document.getElementById("c2AnimImg2");
  if (!container || !img) return;

  const frames = [
    "c2b_anim_01.png",
    "c2b_anim_02.png",
    "c2b_anim_03.png",
    "c2b_anim_04.png",
    "c2b_anim_05.png",
  ];

  // 프리로드
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
