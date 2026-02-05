// Add scrolling header effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 10000) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Portfolio filtering
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class
        filterBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Animate skill bars on scroll
  const skillSection = document.querySelector(".skills");
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillSection && skillBars.length > 0) {
    let animated = false;

    function animateSkills() {
      if (isInViewport(skillSection) && !animated) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("style").split(":")[1];
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
        animated = true;
      }
    }

    window.addEventListener("scroll", animateSkills);
    // Trigger once on page load
    animateSkills();
  }
});

function isInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const words = ["Web Developer.", "QA Tester.", "Game Developer.", "Gamer."];
const typed = document.querySelector(".typed");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typed.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 1200);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeLoop, isDeleting ? 60 : 100);
}

typeLoop();

const particles = document.querySelectorAll(".background span");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  particles.forEach((particle, index) => {
    const depth = ((index % 5) + 1) * 0.6; // different depth layers
    particle.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

particles.forEach((particle) => {
  let direction = Math.random() > 0.5 ? 1 : -1;
  let opacity = Math.random() * 0.4 + 0.3;

  setInterval(() => {
    opacity += direction * 0.02;

    if (opacity > 0.7 || opacity < 0.25) {
      direction *= -1;
    }

    particle.style.opacity = opacity;
  }, 1200 + Math.random() * 1500);
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.removeEventListener("mousemove", () => {});
}
