// =========================
// cards 인터랙션 (그대로 유지)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".person__card");

  if (!("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-open"));
    return;
  }

  const blindIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-open", entry.isIntersecting);
    });
  }, {
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px"
  });

  cards.forEach(el => blindIO.observe(el));
});

// =========================
// JS 로드 표시
// =========================
document.documentElement.classList.add("js");


// =========================
// GSAP Hero (A안 전용) — 그대로 유지
// =========================
let HERO_ST = null;
let HERO_TL = null;

function buildHeroScroll_A() {
  if (!window.gsap || !window.ScrollTrigger) {
    document.body.classList.add("is-box");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector("#top");
  const lid = document.querySelector(".hero__lid");
  const bottom = document.querySelector(".hero__bottom");
  const lidMask = document.querySelector(".hero__lidMask");
  const titleOnly = document.querySelector(".hero__titleOnly");
  const heroIntro = document.querySelector(".hero__introStage");

  if (!hero || !lid || !bottom || !lidMask || !titleOnly || !heroIntro) {
    document.body.classList.add("is-box");
    return;
  }

  if (HERO_ST) HERO_ST.kill();
  if (HERO_TL) HERO_TL.kill();

  hero.classList.remove("hero-done");

  gsap.set([lid, bottom], { xPercent: -50, opacity: 0 });
  gsap.set(titleOnly, { opacity: 1 });
  gsap.set(heroIntro, { opacity: 0, y: 16 });

  const scrollLen = window.innerHeight * 1.35;

  HERO_TL = gsap.timeline({ defaults: { ease: "none" } });

  HERO_TL.to(titleOnly, { opacity: 0, y: -10, duration: 0.18 }, 0)
         .to([lid, bottom], { opacity: 1, duration: 0.18 }, 0.06)
         .to(lid, { yPercent: -120, duration: 0.6 }, 0.2)
         .to(bottom, { yPercent: 120, duration: 0.6 }, 0.2)
         .to(lidMask, { yPercent: -290, opacity: 0, duration: 0.6 }, 0.2)
         .to(heroIntro, { opacity: 1, y: 0, duration: 0.36 }, 0.32)
         .to({}, { duration: 0.15 }, 0.7)
         .to(heroIntro, { opacity: 0, y: -10, duration: 0.2 }, 0.85)
         .to(lid, { yPercent: -180, opacity: 0, duration: 0.25 }, 0.88)
         .to(bottom, { yPercent: 180, opacity: 0, duration: 0.25 }, 0.88);

  HERO_ST = ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: `+=${scrollLen}`,
    scrub: true,
    pin: true,
    animation: HERO_TL,
    onUpdate: self => {
      if (self.progress > 0.01) document.body.classList.add("is-box");
    }
  });

  ScrollTrigger.refresh();
}


// =========================
// ✅ STEP 카드 (People / Chapters)
// =========================
function buildStepCards() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".step").forEach(step => {
    const box = step.querySelector(".sectionBox");
    if (!box) return;

    const isFinal = step.classList.contains("step--final");

    gsap.set(box, { opacity: 0, y: 34 });

    // ✅ 스크롤 “덜” 하게: pin 구간 자체를 줄임
    const endLen = isFinal ? "+=90%" : "+=80%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: "top top",
        end: endLen,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    // ✅ 더 빨리 나타나기
    tl.to(box, { opacity: 1, y: 0, duration: 0.22 }, 0.05);

    // ✅ final은 유지 / people은 더 빨리 사라지기
    tl.to(
      box,
      isFinal
        ? { opacity: 1, y: 0, duration: 0.2 }
        : { opacity: 0, y: -26, duration: 0.22 },
      0.62
    );
  });
}



// =========================
// init
// =========================
window.addEventListener("load", () => {
  buildHeroScroll_A();
  buildStepCards();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
