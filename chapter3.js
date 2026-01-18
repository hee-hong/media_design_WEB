document.addEventListener("DOMContentLoaded", () => {
  console.log("chapter3.js loaded ✅");

  /* =========================
     1) Top fixed banner on/off
     - HTML: <div class="hero-banner" id="heroBanner">
     ========================= */
  const heroBanner = document.getElementById("heroBanner");
  const COMPACT_AT = 80;

  const updateBanner = () => {
    if (!heroBanner) return;
    const on = window.scrollY > COMPACT_AT;
    heroBanner.classList.toggle("is-on", on);
    document.body.classList.toggle("has-banner", on);
  };

  window.addEventListener("scroll", updateBanner, { passive: true });
  window.addEventListener("resize", updateBanner);
  updateBanner();

  /* =========================
     2) Reveal (.turn → reveal 자동 부여)
     ========================= */
  const turns = document.querySelectorAll(".turn");
  turns.forEach((el) => el.classList.add("reveal"));

  const targets = document.querySelectorAll(".reveal");
  console.log("reveal targets:", targets.length);

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
  } else {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => revealIO.observe(el));
  }
});


/* =========================
   Chapter 3 Scroll Frame Animation (10 frames)
   - HTML:
     <section class="scrollAnim" id="c4-scrollAnim">
       <img id="c4AnimImg" src="c4_anim_01.PNG">
     </section>
   - Files (same folder as chapter3.html):
     c4_anim_01.PNG ~ c4_anim_10.PNG
   ========================= */
(() => {
  const container = document.getElementById("c4-scrollAnim");
  const img = document.getElementById("c4AnimImg");
  if (!container || !img) {
    console.warn("c4 anim elements not found ❗️", { container, img });
    return;
  }

  // ✅ 챕터2처럼 "짧은 상대경로(파일명만)"로 고정 (같은 폴더일 때 제일 안전)
  const frames = [
    "c4_anim_01.PNG",
    "c4_anim_02.PNG",
    "c4_anim_03.PNG",
    "c4_anim_04.PNG",
    "c4_anim_05.PNG",
    "c4_anim_06.PNG",
    "c4_anim_07.PNG",
    "c4_anim_08.PNG",
    "c4_anim_09.PNG",
    "c4_anim_10.PNG",
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

    // ✅ 네 챕터2에서 "잘 되는 방식" 그대로
    const total = rect.height - viewH;
    const raw = total <= 0 ? 1 : (-rect.top / total);
    const progress = Math.min(1, Math.max(0, raw));

    const idx = Math.round(progress * (frames.length - 1));

    if (idx !== lastIndex) {
      img.src = frames[idx];
      lastIndex = idx;
      // 디버그 필요하면 켜기:
      // console.log("c4 frame ->", idx + 1);
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
  console.log("c4 scroll anim ready ✅");
})();
