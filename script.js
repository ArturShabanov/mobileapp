(function () {
  const WA_PHONE = "77004320505";
  const WA_DISPLAY = "+7 700 432 05 05";
  const WA_BASE = `https://wa.me/${WA_PHONE}`;

  function buildWaUrl(text) {
    return text ? `${WA_BASE}?text=${encodeURIComponent(text)}` : WA_BASE;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const whatsappLink = document.getElementById("whatsapp-link");
  if (whatsappLink) {
    whatsappLink.href = buildWaUrl(
      "Здравствуйте! Хочу обсудить разработку мобильного приложения (mobileapp.kz)"
    );
    whatsappLink.textContent = WA_DISPLAY;
  }

  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("nav--open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot[data-slide]");
  let slideIndex = 0;
  let slideTimer;

  function showSlide(index) {
    slideIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((t, i) => {
      t.classList.toggle("testimonial--active", i === slideIndex);
    });
    dots.forEach((d, i) => {
      d.classList.toggle("dot--active", i === slideIndex);
    });
  }

  function startAutoplay() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(slideIndex + 1), 6000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      startAutoplay();
    });
  });

  if (testimonials.length) {
    showSlide(0);
    startAutoplay();
  }

  const heroTrack = document.getElementById("hero-slider-track");
  const heroDots = document.querySelectorAll("[data-hero-slide]");
  const heroSlideCount = heroTrack ? heroTrack.children.length : 0;
  let heroIndex = 0;
  let heroTimer = null;

  function showHeroSlide(index) {
    if (!heroTrack || !heroSlideCount) return;
    heroIndex = ((index % heroSlideCount) + heroSlideCount) % heroSlideCount;
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
    heroDots.forEach((dot, i) => {
      const active = i === heroIndex;
      dot.classList.toggle("hero-slider__dot--active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function startHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
    if (heroSlideCount < 2) return;
    heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 3000);
  }

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showHeroSlide(Number(dot.dataset.heroSlide));
      startHeroAutoplay();
    });
  });

  if (heroTrack && heroSlideCount) {
    showHeroSlide(0);
    startHeroAutoplay();
  }

  const form = document.getElementById("lead-form");
  const success = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const phone = data.get("phone");
      const project = data.get("project");
      const message = data.get("message") || "";

      const text = `Заявка с mobileapp.kz\nПроект: ${project}\nТелефон: ${phone}${message ? "\nКомментарий: " + message : ""}`;

      if (success) {
        success.hidden = false;
        form.querySelector('button[type="submit"]').disabled = true;
      }

      window.open(buildWaUrl(text), "_blank", "noopener");
    });
  }

  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 20 ? "0 4px 24px rgba(0,0,0,0.3)" : "none";
      }
      lastScroll = y;
    },
    { passive: true }
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".card, .case, .step, .price-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = ".is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
  document.head.appendChild(style);
})();
