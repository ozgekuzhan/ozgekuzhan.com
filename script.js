document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".floating-text");
  let intervalId;

  function randomizePositions() {
    elements.forEach((el, index) => {
      const top = Math.random() * 80;
      const left = Math.random() * 80;
      const delay = index * 1.5;

      el.style.top = `${top}%`;
      el.style.left = `${left}%`;
      el.style.animationDelay = `${delay}s`;

      el.classList.remove("animate");
      requestAnimationFrame(() => {
        el.classList.add("animate");
      });
    });
  }

  function startAnimation() {
    randomizePositions();
    intervalId = setInterval(randomizePositions, 6000);
  }

  function stopAnimation() {
    clearInterval(intervalId);
  }

  startAnimation();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  document.getElementById("current-year").textContent = new Date().getFullYear();
});
