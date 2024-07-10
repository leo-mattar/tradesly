// --- GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- PAPER TIGET SIGNATURE
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// CURRENT YEAR
const currentYear = document.querySelector('[current-year]');
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- GLOBAL FADE
function fade() {
  let elements = gsap.utils.toArray("[fade]");
  gsap.set(elements, { autoAlpha: 0, y: "5em" });
  // gsap.set(elements, { autoAlpha: 0 });

  ScrollTrigger.batch(elements, {
    once: true,
    start: "top 90%",
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.2,
      });
    },
  });
}

// --- GLOBAL - LINE ANIMATION
function drawLine() {
  gsap.set("[draw-line]", {
    autoAlpha: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

// --- HEADER VISIBILITY STATUS
window.enableHeaderScroll = true;
let lastScrollTop = 0;

function headerStatus() {
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!window.enableHeaderScroll) return;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      gsap.to(".c-header", { duration: 0.4, autoAlpha: 0 });
    } else {
      // Scrolling up
      gsap.to(".c-header", { duration: 0.4, autoAlpha: 1 });
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// --- HERO ROTATION WORDS
function heroTxtRotation() {
  const mask = document.querySelectorAll(".c-mask");
  mask.forEach((item, index) => {
    const track = item.querySelector(".c-mask-track");
    const maskItems = item.querySelectorAll(".c-mask-item");
    const tl = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: "expo.inOut",
        duration: 1.2,
        delay: 1.2
      }
    });

    maskItems.forEach((item, index) => {
      const distance = (index + 1) * -100;
      tl.to(track, { yPercent: distance });
    });

    maskItems.forEach((item) => {
      const clonedItem = item.cloneNode(true);
      track.appendChild(clonedItem);
    });
  });
}

// --- GROWTH HOVER
function growthHover() {
  let growthItems = document.querySelectorAll(".c-growth-item");

  growthItems.forEach(item => {
    let growthArrow = item.querySelector(".c-icon.growth-arrow");
    let growthBG = item.querySelector(".c-growth-item-bg");

    let tl = gsap.timeline({ paused: true, defaults: { duration: 0.8, ease: "power3.inOut" } });

    tl.to(growthBG, { scaleX: 1 });
    tl.to(growthArrow, { yPercent: 10 }, 0);

    item.addEventListener("mouseenter", function () {
      tl.restart();
    });

    item.addEventListener("mouseleave", function () {
      tl.reverse();
    });

  });
}

// --- BEFORE & AFTER
function beforeAfter() {
  let images = $(".c-img.market");
  if (images.length > 1) {
    $(".c-img-contain.market").each(function () {
      let img = $(this).find(".c-img");
      let label = $(this).find(".c-label");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 40%",
          end: "bottom bottom",
          scrub: true,
        }
      });

      gsap.set(label.eq(1), { autoAlpha: 0 })

      tl.to(img.eq(0), { autoAlpha: 0 });
      tl.to(label.eq(0), { autoAlpha: 0 }, 0);
      tl.to(img.eq(1), { autoAlpha: 1 }, 0);
      tl.to(label.eq(1), { autoAlpha: 1 }, 0);
    });
  }
}

// --- GLOBAL - STATS COUNTER
function statsCounter() {
  $("[counter]").each(function (index) {
    let thisId = "countup" + index;
    $(this).attr("id", thisId);
    let startNumber = $(this).attr("start-number") !== undefined ? +$(this).attr(
      "start-number") : 0;
    let endNumber = +$(this).attr("final-number");
    let decimals = +$(this).attr("decimals");
    let duration = $(this).attr("count-duration");

    let myCounter = new CountUp(
      thisId,
      startNumber,
      endNumber,
      decimals,
      duration
    );
    ScrollTrigger.create({
      trigger: $(this),
      start: "top bottom",
      onEnter: () => {
        myCounter.start();
      },
    });
  });
}

// --- HEADER MOBILE
function headerMobile() {
  let headerBtn = $(".c-nav-btn");
  let headerNav = $(".c-header-nav");
  let headerLinks = $(".c-nav-link");
  let menuLine1 = $(".c-icon.menu rect")[0];
  let menuLine2 = $(".c-icon.menu rect")[1];
  let menuLine3 = $(".c-icon.menu rect")[2];

  let tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut", duration: 0.6 } });

  gsap.set(headerNav, { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 });
  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.to(headerNav, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(menuLine1, { rotation: 45, y: 7 }, 0);
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -7 }, 0);

  headerBtn.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
    } else {
      tl.reverse();
    }
  });

  headerLinks.on("click", function () {
    headerBtn.click();
  });
}

// --- PAGE LOAD
function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".o-page-wrapper", { autoAlpha: 1, duration: 1, ease: "power2.out" });
}

// --- INIT
function init() {
  heroTxtRotation();
  beforeAfter();
  fade();
  drawLine();
  statsCounter();
  pageLoad();
  headerStatus();
}
init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  growthHover();
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerMobile();
  return () => {
    //
  };
});
