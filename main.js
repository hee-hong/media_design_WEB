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
