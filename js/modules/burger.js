export const burger = ({btn, menu, link}) => {
  document.addEventListener('click', ({target}) => {
    if (target === btn || target.matches(link) ||
      !target.closest('.header__menu_active')) {
      menu.classList.toggle('header__menu_active');
    }
  });
};
