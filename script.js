/* ============================================
   North & Co. — Landing page interactions
   ============================================ */

(function () {
  "use strict";

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.hidden = expanded;
      mobileMenu.style.display = expanded ? "none" : "flex";
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        mobileMenu.style.display = "none";
      });
    });
  }

  /* ---------- Countdown al 11 de mayo ---------- */
  const targetDate = (() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 4 /* mayo */, 11, 23, 59, 59);
    if (target < now) target.setFullYear(now.getFullYear() + 1);
    return target;
  })();

  const countdownEls = {
    days: document.querySelector('.countdown [data-unit="days"]'),
    hours: document.querySelector('.countdown [data-unit="hours"]'),
    minutes: document.querySelector('.countdown [data-unit="minutes"]'),
    seconds: document.querySelector('.countdown [data-unit="seconds"]'),
  };

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = Math.max(0, targetDate - new Date());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    if (countdownEls.days) countdownEls.days.textContent = pad(days);
    if (countdownEls.hours) countdownEls.hours.textContent = pad(hours);
    if (countdownEls.minutes) countdownEls.minutes.textContent = pad(minutes);
    if (countdownEls.seconds) countdownEls.seconds.textContent = pad(seconds);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Suscripción al newsletter ---------- */
  const form = document.querySelector(".order__form");
  const feedback = document.querySelector(".order__feedback");
  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']").value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        feedback.textContent = "Por favor ingresa un correo válido.";
        feedback.style.color = "#b9355a";
        return;
      }
      feedback.textContent = "¡Listo! Revisa tu correo: te enviamos tu cupón 🌷";
      feedback.style.color = "#1f1714";
      form.reset();
    });
  }

  /* ---------- Carrito demo ---------- */
  const cartBadge = document.querySelector(".icon-btn--cart .icon-btn__badge");
  let cartCount = 0;
  document.querySelectorAll(".product .btn, .menu .btn").forEach((btn) => {
    if (btn.textContent.trim().toLowerCase().includes("agregar")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartCount += 1;
        if (cartBadge) cartBadge.textContent = cartCount;
        const original = btn.textContent;
        btn.textContent = "Añadido ✓";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 1400);
      });
    }
  });

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".section-header, .product, .review, .cat-card, .how__steps li")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(el);
      });
  }
})();
