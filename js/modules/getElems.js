export const heroTimer = document.querySelector('.timer');

export const heroText = document.querySelector('.hero__text');

export const getMainAccordion = () => {
  const accordion = document.querySelector('.travel__accordion');
  const buttons = accordion.querySelectorAll('.travel__item-title');
  const items = accordion.querySelectorAll('.travel__item');
  const wrappers = accordion.querySelectorAll('.travel__item-text-wrapper');

  return {
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

export const getFormTour = document.querySelector('.tour__form');

export const getFormReservation = document.querySelector('.reservation__form');

export const getFooterForm = () => {
  const form = document.querySelector('.footer__form');
  const formTitle = form.querySelector('.footer__form-title');
  const formText = form.querySelector('.footer__text');
  const submitBtn = form.querySelector('.footer__button');

  return {
    form,
    title: formTitle,
    paragraph: formText,
    btn: submitBtn,
  };
};
