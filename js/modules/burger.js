// function back(x, timeFraction) {
//   return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
// };
const animateBurger = timestemp => {
  let initTime = NaN;
  const dur = 1500;
  const progress = (timestemp - initTime) / dur;
  initTime ||= timestemp;
};

export const burger = ({btn, menu, link}) => {
  document.addEventListener('click', ({target}) => {
    if (target === btn || target.matches(link) ||
      (!target.closest('.header__menu_active') &&
        menu.classList.contains('header__menu_active'))) {
      menu.classList.toggle('header__menu_active');
    }
  });
};
