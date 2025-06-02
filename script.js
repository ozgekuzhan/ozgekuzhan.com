document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".floating-text");
  let currentIndex = 0;
  let animationDuration = 4000;
  let displayInterval;

  function showNextFloatingText() {
    if (currentIndex > 0) {
      const prevIndex = (currentIndex - 1 + elements.length) % elements.length;
      elements[prevIndex].classList.remove("animate");
      elements[prevIndex].style.opacity = '0';
    }

    const currentElement = elements[currentIndex];

    const top = Math.random() * 70;
    const left = Math.random() * 70;

    currentElement.style.top = `${top}%`;
    currentElement.style.left = `${left}%`;
    currentElement.style.opacity = '0';

    currentElement.classList.add("animate");

    currentIndex = (currentIndex + 1) % elements.length;
  }

  function startFloatingTextAnimation() {
    clearInterval(displayInterval);

    showNextFloatingText();

    displayInterval = setInterval(showNextFloatingText, animationDuration);
  }

  function stopFloatingTextAnimation() {
    clearInterval(displayInterval);
    elements.forEach(el => {
      el.classList.remove("animate");
      el.style.opacity = '0';
    });
  }

  startFloatingTextAnimation();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopFloatingTextAnimation();
    } else {
      startFloatingTextAnimation();
    }
  });

  document.getElementById("current-year").textContent = new Date().getFullYear();
});
