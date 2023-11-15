import * as elems from './modules/getElems.js';
import {timerInit} from './modules/timer.js';

const {
  heroTimer,
  heroText,
} = elems;

document.addEventListener('DOMContentLoaded', () => {
  const app = () => {
    timerInit(heroTimer, '30/Dec/2023,12:12:00', heroText);
  };

  app();
});
