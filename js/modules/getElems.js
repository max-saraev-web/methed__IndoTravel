export const heroTimer = document.querySelector('.timer');

export const heroText = document.querySelector('.hero__text');

export const getMainAccordion = () => {
  const accordion = document.querySelector('.travel__accordion');
  const buttons = accordion.querySelectorAll('.travel__item-title');
  const items = accordion.querySelectorAll('.travel__item');
  const wrappers = accordion.querySelectorAll('.travel__item-text-wrapper');

  return {
    accordion,
    buttons,
    items,
    wrappers,
  };
};

export const getBurger = () => {
  const btn = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');
  const link = '.header__link';

  return {
    btn,
    menu,
    link,
  };
};
