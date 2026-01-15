document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".person__card");
  console.log("cards found:", cards.length);

  // IntersectionObserver 미지원이면 그냥 항상 열어두기
  if (!("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-open"));
    return;
  }

  const blindIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // ✅ 들어오면 열기
      if (entry.isIntersecting) {
        entry.target.classList.add("is-open");
      } else {
        // ✅ 나가면 다시 접기 (다시 내려올 때 또 열리게)
        entry.target.classList.remove("is-open");
      }
    });
  }, {
    threshold: 0.35,                 // 0.2~0.5 사이 취향 조절
    rootMargin: "0px 0px -10% 0px"
  });

  cards.forEach((el) => blindIO.observe(el));
});



gsap.registerPlugin(ScrollTrigger);

function buildHeroScroll() {
  const hero = document.querySelector("#top");
  const main = document.querySelector("main");

  const lid = document.querySelector(".hero__lid");
  const bottom = document.querySelector(".hero__bottom");
  const paper = document.querySelector(".hero__paper");
  const titleImg = document.querySelector(".hero__titleImg");
  const stage = document.querySelector(".hero__stage"); // ✅ hero 레이어 전체(있으면)

  if (!hero || !main || !lid || !bottom) return;

  const scrollLen = window.innerHeight * 1.1;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: `+=${scrollLen}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onLeave: () => hero.classList.add("hero-done"),
      onEnterBack: () => hero.classList.remove("hero-done"),
    }
  });

  tl.to(lid, { yPercent: -120, ease: "none" }, 0);
  tl.to(bottom, { yPercent: 120, ease: "none" }, 0);

  // ✅ hero 안 요소만 페이드 (pageBox는 절대 포함 X)
  tl.to([paper, titleImg].filter(Boolean), { opacity: 0, ease: "none" }, 0.15);

  // ✅ 너의 의도 유지: main 끌어올림은 유지해도 됨
  tl.to(main, { y: -window.innerHeight, ease: "none" }, 0);
}

window.addEventListener("load", () => {
  // ✅ lid/bottom 기본 스케일 고정 (GSAP가 transform을 덮어써도 scale 유지)
  gsap.set([".hero__lid", ".hero__bottom"], {
    scale: 1,
    transformOrigin: "50% 50%"
  });

  buildHeroScroll();
});


window.addEventListener("resize", () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.set("main", { clearProps: "transform" });
  buildHeroScroll();
});
