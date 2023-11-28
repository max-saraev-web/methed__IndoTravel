import {accordion} from './modules/accordion.js';
import {burger} from './modules/burger.js';
import formTour from './modules/formTour.js';
import * as elems from './modules/getElems.js';
import progress from './modules/progress.js';
import {timerInit} from './modules/timer.js';

const {
  heroTimer,
  heroText,
  getMainAccordion,
  getBurger,
} = elems;

document.addEventListener('DOMContentLoaded', () => {
  const app = () => {
    timerInit(heroTimer, '30/Dec/2023,12:12:00', heroText);
    accordion(getMainAccordion());
    burger(getBurger());
    progress();
    formTour();
  };

  app();
});
