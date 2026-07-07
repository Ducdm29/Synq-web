/* ============================================================
   SYNQ MOTION ENGINE — Professional Scroll Animations
   Zero-dependency, IntersectionObserver-powered
   ============================================================ */

(() => {
  'use strict';

  // ── Configuration ──
  const CONFIG = {
    // Intersection Observer thresholds
    revealThreshold: 0.15,
    revealRootMargin: '0px 0px -60px 0px',

    // Animation durations (ms)
    staggerDelay: 100,
    counterDuration: 2000,
    counterEasing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart

    // Parallax intensity (lower = subtler)
    parallaxFactor: 0.08,

    // Magnetic button strength
    magneticStrength: 0.3,
  };

  // ── Utilities ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // ── 1. SCROLL REVEAL SYSTEM ──
  // Adds class `.revealed` when element enters viewport
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.revealDelay || '0', 10);

            setTimeout(() => {
              el.classList.add('revealed');
            }, delay);

            // Unobserve after reveal (one-shot)
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: CONFIG.revealThreshold,
        rootMargin: CONFIG.revealRootMargin,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // ── 2. STAGGERED CHILDREN REVEAL ──
  // Parent has [data-reveal-stagger], children get staggered delays
  function initStaggerReveal() {
    const staggerParents = document.querySelectorAll('[data-reveal-stagger]');
    if (!staggerParents.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target;
            const children = parent.querySelectorAll('[data-reveal]');
            const baseDelay = parseInt(parent.dataset.revealStagger || CONFIG.staggerDelay, 10);

            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('revealed');
              }, baseDelay * index);
            });

            observer.unobserve(parent);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    staggerParents.forEach((el) => observer.observe(el));
  }

  // ── 3. COUNTER ANIMATION ──
  // Elements with [data-counter="6000"] animate from 0 to target
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = el.dataset.counter;
            const suffix = el.dataset.counterSuffix || '';
            const prefix = el.dataset.counterPrefix || '';
            const isNumeric = !isNaN(parseFloat(target));

            if (isNumeric) {
              animateCounter(el, parseFloat(target), prefix, suffix);
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el, target, prefix, suffix) {
    if (prefersReducedMotion) {
      el.textContent = prefix + formatNumber(target) + suffix;
      return;
    }

    const startTime = performance.now();
    const duration = CONFIG.counterDuration;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = CONFIG.counterEasing(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = prefix + formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function formatNumber(num) {
    return num.toLocaleString('en-US');
  }

  // ── 4. PARALLAX ON SCROLL ──
  // Elements with [data-parallax] move slightly on scroll
  function initParallax() {
    if (prefersReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax || CONFIG.parallaxFactor);
        const centerOffset = (rect.top + rect.height / 2 - windowHeight / 2);
        const translateY = centerOffset * speed * -1;

        el.style.transform = `translate3d(0, ${translateY}px, 0)`;
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial call
    updateParallax();
  }

  // ── 5. SMOOTH HEADER (shrink on scroll) ──
  function initSmoothHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;

      if (scrollY > 80) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }

      // Hide header on scroll down, show on scroll up (after 300px)
      if (scrollY > 300) {
        if (scrollY > lastScrollY + 10) {
          header.classList.add('header-hidden');
        } else if (scrollY < lastScrollY - 5) {
          header.classList.remove('header-hidden');
        }
      } else {
        header.classList.remove('header-hidden');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── 6. MAGNETIC BUTTONS ──
  // Buttons with [data-magnetic] follow cursor slightly
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    // Only on non-touch devices
    if ('ontouchstart' in window) return;

    const magneticElements = document.querySelectorAll('[data-magnetic]');
    if (!magneticElements.length) return;

    magneticElements.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || CONFIG.magneticStrength);

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        setTimeout(() => {
          el.style.transition = '';
        }, 400);
      });
    });
  }

  // ── 7. FLOATING AMBIENT ORBS ──
  function initFloatingOrbs() {
    if (prefersReducedMotion) return;

    const orbs = document.querySelectorAll('.glow-orb');
    if (!orbs.length) return;

    orbs.forEach((orb, i) => {
      const duration = 20000 + i * 5000;
      const amplitude = 30 + i * 15;

      let startTime = performance.now() + i * 3000;

      function animateOrb(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = (elapsed % duration) / duration;
        const angle = progress * Math.PI * 2;

        const x = Math.sin(angle) * amplitude;
        const y = Math.cos(angle * 0.7) * amplitude * 0.6;
        const scale = 1 + Math.sin(angle * 0.5) * 0.1;

        orb.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

        requestAnimationFrame(animateOrb);
      }

      requestAnimationFrame(animateOrb);
    });
  }

  // ── 8. TEXT SPLIT & REVEAL ──
  // Elements with [data-text-reveal] split text into spans for word-by-word reveal
  function initTextReveal() {
    if (prefersReducedMotion) return;

    const textElements = document.querySelectorAll('[data-text-reveal]');
    if (!textElements.length) return;

    textElements.forEach((el) => {
      // Preserve the original HTML for i18n compatibility
      const originalHTML = el.innerHTML;

      // Only split if it hasn't been processed yet
      if (el.dataset.textRevealProcessed) return;
      el.dataset.textRevealProcessed = 'true';

      // Split text nodes into word spans
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map(
          (word, i) =>
            `<span class="word-reveal" style="--word-index:${i}"><span class="word-reveal-inner">${word}</span></span>`
        )
        .join(' ');
    });

    // Observe for reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('text-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    textElements.forEach((el) => observer.observe(el));
  }

  // ── 9. TILT EFFECT ON PHONE IMAGES ──
  function initPhoneTilt() {
    if (prefersReducedMotion) return;
    if ('ontouchstart' in window) return;

    const phones = document.querySelectorAll('.hero-phone, .feature-phone');
    if (!phones.length) return;

    phones.forEach((phone) => {
      const wrap = phone.closest('.hero-phone-wrap, .feature-phone-wrap');
      if (!wrap) return;

      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateY = x * 12;
        const rotateX = -y * 8;
        const glare = 0.1 + (x + 0.5) * 0.15;

        phone.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
        phone.style.transition = 'transform 0.1s ease-out';
      });

      wrap.addEventListener('mouseleave', () => {
        phone.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        phone.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      });
    });
  }

  // ── 10. SMOOTH SCROLL PROGRESS BAR ──
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    let ticking = false;

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── INITIALIZATION ──
  function init() {
    // Apply data attributes to existing elements
    applyMotionAttributes();

    // Initialize all systems
    initScrollReveal();
    initStaggerReveal();
    initCounters();
    initParallax();
    initSmoothHeader();
    initMagneticButtons();
    initFloatingOrbs();
    initPhoneTilt();
    initScrollProgress();

    // Mark body as motion-ready (enables CSS transitions)
    document.body.classList.add('motion-ready');
  }

  // ── AUTO-APPLY MOTION ATTRIBUTES ──
  // Automatically add data attributes to existing page elements
  function applyMotionAttributes() {
    // Hero section elements
    const heroEyebrow = document.querySelector('.eyebrow-pill');
    if (heroEyebrow) {
      heroEyebrow.setAttribute('data-reveal', 'fade-down');
      heroEyebrow.setAttribute('data-reveal-delay', '100');
    }

    const heroH1 = document.querySelector('#hero-h1');
    if (heroH1) {
      heroH1.setAttribute('data-reveal', 'fade-up');
      heroH1.setAttribute('data-reveal-delay', '250');
    }

    const heroSub = document.querySelector('.hero-sub');
    if (heroSub) {
      heroSub.setAttribute('data-reveal', 'fade-up');
      heroSub.setAttribute('data-reveal-delay', '400');
    }

    const heroBadges = document.querySelector('.hero-badges');
    if (heroBadges) {
      heroBadges.setAttribute('data-reveal-stagger', '80');
      heroBadges.querySelectorAll('.badge').forEach((badge) => {
        badge.setAttribute('data-reveal', 'fade-up-scale');
      });
    }

    const heroCtas = document.querySelector('.hero-ctas');
    if (heroCtas) {
      heroCtas.setAttribute('data-reveal', 'fade-up');
      heroCtas.setAttribute('data-reveal-delay', '600');
    }

    // Hero phone
    const heroPhone = document.querySelector('.hero-phone-wrap');
    if (heroPhone) {
      heroPhone.setAttribute('data-reveal', 'fade-left');
      heroPhone.setAttribute('data-reveal-delay', '500');
      heroPhone.setAttribute('data-parallax', '0.06');
    }

    // Feature banner
    const featureBanner = document.querySelector('.feature-banner-wrap');
    if (featureBanner) {
      featureBanner.setAttribute('data-reveal', 'zoom-in');
      featureBanner.setAttribute('data-reveal-delay', '200');
    }

    // Feature rows
    document.querySelectorAll('.feature-row').forEach((row) => {
      const text = row.querySelector('.feature-text');
      const phone = row.querySelector('.feature-phone-wrap');

      if (text) {
        const eyebrow = text.querySelector('.feat-eyebrow');
        const heading = text.querySelector('h2');
        const desc = text.querySelector('p');
        const list = text.querySelector('.feat-list');

        if (eyebrow) {
          eyebrow.setAttribute('data-reveal', 'fade-right');
          eyebrow.setAttribute('data-reveal-delay', '0');
        }
        if (heading) {
          heading.setAttribute('data-reveal', 'fade-up');
          heading.setAttribute('data-reveal-delay', '100');
        }
        if (desc) {
          desc.setAttribute('data-reveal', 'fade-up');
          desc.setAttribute('data-reveal-delay', '200');
        }
        if (list) {
          list.setAttribute('data-reveal-stagger', '100');
          list.querySelectorAll('li').forEach((li) => {
            li.setAttribute('data-reveal', 'fade-right');
          });
        }
      }

      if (phone) {
        phone.setAttribute('data-reveal', row.classList.contains('feat-row-reverse') ? 'fade-right' : 'fade-left');
        phone.setAttribute('data-reveal-delay', '200');
        phone.setAttribute('data-parallax', '0.05');
      }
    });

    // Stats strip
    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
      statsStrip.setAttribute('data-reveal', 'fade-up');

      // Set up counters
      const statNums = statsStrip.querySelectorAll('.stat-num');
      statNums.forEach((stat) => {
        const text = stat.textContent.trim();
        // Match "6,000" → counter 6000, suffix "+"
        if (text.includes('6,000')) {
          stat.setAttribute('data-counter', '6000');
          stat.setAttribute('data-counter-suffix', '');
          const plus = stat.querySelector('.stat-plus');
          if (plus) stat.setAttribute('data-counter-suffix', '+');
        }
        // Match "100%" 
        else if (text === '100%') {
          stat.setAttribute('data-counter', '100');
          stat.setAttribute('data-counter-suffix', '%');
        }
      });

      // Stagger stat items
      statsStrip.querySelectorAll('.stat-item').forEach((item, i) => {
        item.setAttribute('data-reveal', 'fade-up-scale');
        item.setAttribute('data-reveal-delay', String(i * 150));
      });
    }

    // Download section
    const downloadSection = document.querySelector('.download-inner');
    if (downloadSection) {
      downloadSection.setAttribute('data-reveal', 'zoom-in');
    }

    // Magnetic buttons
    document.querySelectorAll('.btn-store:not(.btn-disabled), .nav-cta, .btn-primary').forEach((btn) => {
      btn.setAttribute('data-magnetic', '0.25');
    });

    // ── SUPPORT / PRIVACY PAGE ELEMENTS ──

    // Page hero (support/privacy)
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      const eyebrow = pageHero.querySelector('.eyebrow');
      const heading = pageHero.querySelector('h1');
      const subtitle = pageHero.querySelector('.subtitle');

      if (eyebrow) {
        eyebrow.setAttribute('data-reveal', 'fade-down');
        eyebrow.setAttribute('data-reveal-delay', '100');
      }
      if (heading) {
        heading.setAttribute('data-reveal', 'fade-up');
        heading.setAttribute('data-reveal-delay', '250');
      }
      if (subtitle) {
        subtitle.setAttribute('data-reveal', 'fade-up');
        subtitle.setAttribute('data-reveal-delay', '400');
      }
    }

    // Cards (support page)
    document.querySelectorAll('.card').forEach((card, i) => {
      card.setAttribute('data-reveal', 'fade-up');
      card.setAttribute('data-reveal-delay', String(i * 100));
    });

    // FAQ items (support page) — stagger
    const faqList = document.querySelector('.faq-list');
    if (faqList) {
      faqList.setAttribute('data-reveal-stagger', '80');
      faqList.querySelectorAll('.faq-item').forEach((item) => {
        item.setAttribute('data-reveal', 'fade-up');
      });
    }

    // Policy sections (privacy page)
    document.querySelectorAll('.policy-section').forEach((section, i) => {
      section.setAttribute('data-reveal', 'fade-up');
      section.setAttribute('data-reveal-delay', String(Math.min(i * 50, 200)));
    });

    // Dividers
    document.querySelectorAll('.divider').forEach((div) => {
      div.setAttribute('data-reveal', 'fade-up');
    });

    // Last updated badge (privacy page)
    const lastUpdated = document.querySelector('.last-updated');
    if (lastUpdated) {
      lastUpdated.setAttribute('data-reveal', 'fade-up-scale');
      lastUpdated.setAttribute('data-reveal-delay', '500');
    }

    // Contact card
    document.querySelectorAll('.contact-card').forEach((card) => {
      card.setAttribute('data-reveal', 'zoom-in');
    });
  }

  // ── KICK OFF ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
