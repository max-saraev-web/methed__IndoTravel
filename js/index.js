import {accordion} from './modules/accordion.js';
import {burger} from './modules/burger.js';
import footerForm from './modules/footerForm.js';
import reservationForm from './modules/formReservation.js';
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

const URL = 'https://jsonplaceholder.typicode.com/posts';
// const URL = 'https://oasis-blushing-tungsten.glitch.me';

document.addEventListener('DOMContentLoaded', () => {
  const app = () => {
    timerInit(heroTimer, '30/Dec/2023,12:12:00', heroText);
    accordion(getMainAccordion());
    burger(getBurger());
    progress();
    formTour();
    reservationForm(URL);
    footerForm(URL);
  };

  app();
});
