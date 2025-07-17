document.addEventListener("DOMContentLoaded", function () {
  const floatingElements = document.querySelectorAll(".floating-text");
  let currentIndex = 0;
  const ANIMATION_DURATION = 4000;
  let displayInterval;

  function showNextFloatingText() {
    if (currentIndex > 0) {
      const prevIndex = (currentIndex - 1 + floatingElements.length) % floatingElements.length;
      floatingElements[prevIndex].classList.remove("animate");
    }

    const currentElement = floatingElements[currentIndex];
    currentElement.style.top = `${Math.random() * 70}%`;
    currentElement.style.left = `${Math.random() * 70}%`;
    currentElement.classList.add("animate");

    currentIndex = (currentIndex + 1) % floatingElements.length;
  }

  function startFloatingTextAnimation() {
    clearInterval(displayInterval);
    showNextFloatingText();
    displayInterval = setInterval(showNextFloatingText, ANIMATION_DURATION);
  }

  function stopFloatingTextAnimation() {
    clearInterval(displayInterval);
    floatingElements.forEach(el => {
      el.classList.remove("animate");
    });
  }

  startFloatingTextAnimation();

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopFloatingTextAnimation() : startFloatingTextAnimation();
  });

  document.getElementById("current-year").textContent = new Date().getFullYear();

  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  function createStarfield() {
    const container = document.getElementById('stars-background');

    for (let i = 0; i < 1000; i++) {
      const star = document.createElement('div');
      star.className = 'star-static';

      const size = Math.random() * 1 + 0.5;
      Object.assign(star.style, {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: size + 'px',
        height: size + 'px',
        opacity: Math.random() * 0.4 + 0.3
      });

      container.appendChild(star);
    }

    for (let i = 0; i < 300; i++) {
      const star = document.createElement('div');
      star.className = 'star-twinkle';

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      const distanceFromCenter = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
      const centerProximity = 1 - (distanceFromCenter / Math.sqrt(5000));

      const baseSize = Math.random() * 1.2 + 0.6;
      const size = baseSize * (1 + centerProximity * 0.5);
      const opacity = Math.min((Math.random() * 0.6 + 0.4) + centerProximity * 0.3, 1);

      Object.assign(star.style, {
        left: x + '%',
        top: y + '%',
        width: size + 'px',
        height: size + 'px',
        opacity: opacity,
        animationDuration: (Math.random() * 3 + 2) + 's',
        animationDelay: Math.random() * 4 + 's'
      });

      container.appendChild(star);
    }
  }

  createStarfield();

  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  function addStaggeredAnimation() {
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    skillsCategories.forEach(category => {
      const skillsItems = category.querySelectorAll('ul li');
      skillsItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-on-scroll');
      });
    });
  }

  addStaggeredAnimation();
  initScrollAnimations();

  function logPerformanceMetrics() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const metrics = {
            'DOM Load Time': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
            'Page Load Time': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
            'DNS Lookup Time': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
            'Server Response Time': Math.round(perfData.responseEnd - perfData.requestStart)
          };
          
          console.group('🚀 Portfolio Performance Metrics');
          Object.entries(metrics).forEach(([key, value]) => {
            console.log(`${key}: ${value}ms`);
          });
          console.groupEnd();
        }, 0);
      });
    }
  }

  logPerformanceMetrics();

  const btn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

const originalTitle = document.title;

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Hire her → Özge Kuzhan";
  } else {
    document.title = originalTitle;
  }
});
