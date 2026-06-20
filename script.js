(function () {
  const WA_PHONE = "77004320505";
  const WA_DISPLAY = "+7 700 432 05 05";
  const WA_BASE = `https://wa.me/${WA_PHONE}`;
  const LEAD_EVENT_NAME = "whatsapp_lead";
  const LEAD_EVENT_TIMEOUT = 1500;

  function buildWaUrl(text) {
    return text ? `${WA_BASE}?text=${encodeURIComponent(text)}` : WA_BASE;
  }

  function trackLeadEvent(done) {
    let completed = false;

    function finish() {
      if (completed) return;
      completed = true;
      done();
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", LEAD_EVENT_NAME, {
        source: "website",
        form: "contact",
        event_callback: finish,
        event_timeout: LEAD_EVENT_TIMEOUT,
      });

      window.setTimeout(finish, LEAD_EVENT_TIMEOUT + 300);
      return;
    }

    finish();
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

  function initHeroSlider() {
    const slider = document.getElementById("hero-slider");
    const heroTrack = document.getElementById("hero-slider-track");
    const heroDots = document.querySelectorAll("[data-hero-slide]");
    const heroSlideCount = heroTrack ? heroTrack.children.length : 0;
    let heroIndex = 0;
    let heroTimer = null;

    if (!slider || !heroTrack || heroSlideCount < 2) return;

    function showHeroSlide(index) {
      heroIndex = ((index % heroSlideCount) + heroSlideCount) % heroSlideCount;
      heroTrack.style.transform = `translate3d(-${heroIndex * 100}%, 0, 0)`;
      heroDots.forEach((dot, i) => {
        const active = i === heroIndex;
        dot.classList.toggle("hero-slider__dot--active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function stopHeroAutoplay() {
      if (heroTimer) clearInterval(heroTimer);
      heroTimer = null;
    }

    function startHeroAutoplay() {
      stopHeroAutoplay();
      heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 3000);
    }

    heroDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showHeroSlide(Number(dot.dataset.heroSlide || 0));
        startHeroAutoplay();
      });
    });

    slider.addEventListener("mouseenter", stopHeroAutoplay);
    slider.addEventListener("mouseleave", startHeroAutoplay);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopHeroAutoplay();
      } else {
        startHeroAutoplay();
      }
    });

    showHeroSlide(0);
    startHeroAutoplay();
  }

  initHeroSlider();

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
      const whatsappUrl = buildWaUrl(text);
      const whatsappWindow = window.open("about:blank", "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
      }

      if (success) {
        success.hidden = false;
        form.querySelector('button[type="submit"]').disabled = true;
      }

      trackLeadEvent(() => {
        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappUrl;
        } else {
          window.location.href = whatsappUrl;
        }
      });
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
