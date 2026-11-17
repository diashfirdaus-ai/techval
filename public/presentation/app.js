(function () {
  const stage = document.getElementById("stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const counterEl = document.getElementById("slideCounter");
  const progressEl = document.getElementById("progressLine");
  const canvas = document.getElementById("bgCanvas");
  let current = 0;

  function fitStage() {
    const pad = 20;
    const sw = (window.innerWidth - pad) / 1920;
    const sh = (window.innerHeight - pad) / 1080;
    const scale = Math.min(sw, sh);
    stage.style.setProperty("--scale", scale.toFixed(4));
  }

  function animateCounters(slideEl) {
    const nums = slideEl.querySelectorAll("[data-count]");
    nums.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const useCommas = el.getAttribute("data-commas") === "true";
      const dur = 950;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        let formatted = val.toFixed(decimals);
        if (useCommas) {
          formatted = Math.round(val).toLocaleString("en-US");
        }
        el.textContent = prefix + formatted + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function animateBars(slideEl) {
    const bars = slideEl.querySelectorAll(".bar-fill");
    bars.forEach((b) => {
      b.style.transition = "none";
      b.style.width = "0%";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.transition = "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
          b.style.width = b.style.getPropertyValue("--w") || "50%";
        });
      });
    });
  }

  function animateRings(slideEl) {
    const rings = slideEl.querySelectorAll("circle[data-pct]");
    rings.forEach((c) => {
      const pct = parseFloat(c.getAttribute("data-pct") || "0");
      const circum = 251.32;
      c.style.transition = "none";
      c.style.strokeDashoffset = String(circum);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          c.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
          c.style.strokeDashoffset = String(circum * (1 - pct / 100));
        });
      });
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const active = i === current;
      s.classList.toggle("active", active);
      if (active) {
        animateCounters(s);
        animateBars(s);
        animateRings(s);
      }
    });
    tabs.forEach((b, i) => b.classList.toggle("active", i === current));
    counterEl.textContent = `0${current + 1} / 0${slides.length}`;
    progressEl.style.width = `${((current + 1) / slides.length) * 100}%`;
  }

  // Subtle architectural grid + drifting nodes on background canvas
  function initBackgroundCanvas() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 1920;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: (i * 197 + 120) % W,
      y: (i * 131 + 90) % H,
      vx: ((i % 2 === 0 ? 1 : -1) * (0.18 + (i % 5) * 0.04)),
      vy: ((i % 3 === 0 ? 1 : -1) * (0.14 + (i % 4) * 0.03)),
    }));

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // Fine architectural grid
      ctx.strokeStyle = "rgba(15, 23, 42, 0.035)";
      ctx.lineWidth = 1;
      const step = 120;
      for (let x = step; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = step; y < H; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 40 || a.x > W - 40) a.vx *= -1;
        if (a.y < 100 || a.y > H - 80) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 280) {
            const alpha = (1 - dist / 280) * 0.09;
            ctx.strokeStyle = `rgba(0, 100, 224, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(0, 100, 224, 0.22)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(drawFrame);
    }

    drawFrame();
  }

  tabs.forEach((btn, idx) => {
    btn.addEventListener("click", () => goTo(idx));
  });
  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key >= "1" && e.key <= "6") {
      goTo(parseInt(e.key, 10) - 1);
    }
  });

  window.addEventListener("resize", fitStage);
  fitStage();
  initBackgroundCanvas();
  if (window.lucide) window.lucide.createIcons();
  goTo(0);
})();
