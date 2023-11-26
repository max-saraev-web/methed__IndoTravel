const back = (timeFraction, x = 1.5) =>
  Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);

let initTime = NaN;
const dur = 800;
let isAnimating = false;
let direction = 1;

const animateBurger = timestamp => {
  initTime ||= timestamp;
  const elem = document.querySelector('.header__menu');

  const progress = back((timestamp - initTime) / dur);
  const percents = progress * 100;

  elem.style.zIndex = direction > 0 ? 1 : -1;
  elem.style.opacity = progress * direction;
  elem.style.filter = `blur(${4 - 4 * (percents / 100)}px)`;
  elem.style.transform = `scale(${2 - progress})`;

  if (progress < 1) {
    requestAnimationFrame(animateBurger);
  } else {
    initTime = NaN;
    direction *= -1;
    isAnimating = false;
  }
};

export const burger = ({btn, menu, link}) => {
  document.addEventListener('click', ({target}) => {
    if (target === btn || target.matches(link) ||
      (!target.closest('.header__menu_active') &&
        menu.classList.contains('header__menu_active'))) {
      menu.classList.toggle('header__menu_active');
      isAnimating = !isAnimating;
      if (isAnimating) requestAnimationFrame(animateBurger);
    }
  });
};
