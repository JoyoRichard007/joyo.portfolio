/* ============================================
   Portfolio — Joyo Richard
   Interactions & animations
   ============================================ */

// ---------- Curseur personnalisé ----------
(function () {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll("a, button, .chip, .award-card, .skill-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });
})();

// ---------- Barre de progression + nav + bouton retour ----------
(function () {
  const progress = document.getElementById("scrollProgress");
  const nav = document.getElementById("nav");
  const backTop = document.getElementById("backTop");

  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", scrollTop > 40);
    backTop.classList.toggle("visible", scrollTop > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// ---------- Menu mobile ----------
(function () {
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });

  links.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    });
  });
})();

// ---------- Lien actif dans la nav ----------
(function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
})();

// ---------- Effet machine à écrire ----------
(function () {
  const el = document.getElementById("typed");
  const roles = [
    "Développeur Full-Stack",
    "Lead Développeur",
    "Champion de hackathons 🏆",
    "Expert en automatisation n8n",
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    el.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx < current.length) {
      charIdx++;
      setTimeout(type, 70);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1800);
    } else if (charIdx > 0) {
      charIdx--;
      setTimeout(type, 35);
    } else {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 350);
    }
  }

  type();
})();

// ---------- Reveal au scroll ----------
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    observer.observe(el);
  });
})();

// ---------- Barres de langues ----------
(function () {
  const bars = document.querySelectorAll(".bar-fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("filled");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((b) => observer.observe(b));
})();

// ---------- Compteurs animés ----------
(function () {
  const nums = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((n) => observer.observe(n));
})();

// ---------- Fond : particules connectées ----------
(function () {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let W, H;
  const COUNT = Math.min(70, Math.floor(window.innerWidth / 18));

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6,
    });
  }

  let mouseX = -9999, mouseY = -9999;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Légère attraction vers la souris
      const dxm = mouseX - p.x;
      const dym = mouseY - p.y;
      const dm = Math.hypot(dxm, dym);
      if (dm < 160 && dm > 0.1) {
        p.x += (dxm / dm) * 0.35;
        p.y += (dym / dm) * 0.35;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45, 212, 191, 0.35)";
      ctx.fill();
    }

    // Lignes de connexion
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(45, 212, 191, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

// ---------- GSAP : parallaxe hero + animation du nom ----------
(function () {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-name .line", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.to(".hero-photo", {
    y: -50,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".hero-text", {
    y: 40,
    opacity: 0.4,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
})();

// ---------- Année du footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
