export const timerInit = (selector, deadline, title) => {
  selector.dataset.timerDeadline = deadline;

  const getTimeRemaning = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaning = dateStop - dateNow;

    const days = Math.floor(timeRemaning / (1000 * 60 * 60 * 24));
    const minutes = Math.floor(timeRemaning / 1000 / 60 % 60);
    const hours = (Math.floor(timeRemaning / (1000 * 60 * 60)) % 24);

    return {timeRemaning, days, minutes, hours};
  };

  const conjugator = (mode, option) => {
    const dictionary = {
      days: [
        'День',
        'Дня',
        'Дней',
      ],
      minutes: [
        'Минута',
        'Минут',
        'Минуты',
      ],
      hours: [
        'Час',
        'Часа',
        'Часов',
      ],
    };
    return dictionary[mode][option];
  };

  const cellRemover = (val, elem) => {
    if (val === 0) {
      elem.style.cssText = `
        opacity: 0;
      `;
    } else if (val > 0) {
      elem.style.cssText = `
        opacity: 1;
      `;
    }
  };

  const startTimer = () => {
    const timer = getTimeRemaning();

    const dayCell = selector.querySelector('.timer__item_days');
    const hourCell = selector.querySelector('.timer__item_hours');
    const minutesCell = selector.querySelector('.timer__item_minutes');

    cellRemover(timer.days, dayCell);
    cellRemover(timer.hours, hourCell);
    cellRemover(timer.minutes, minutesCell);

    dayCell.firstElementChild.textContent = timer.days;
    dayCell.lastElementChild.textContent = conjugator('days',
      timer.days === 1 ? 0 :
      (timer.days > 1 && timer.days < 5) ? 1 :
      (timer.days >= 5) ? 2 :
      'Ошибка');

    hourCell.firstElementChild.textContent = timer.hours;
    hourCell.lastElementChild.textContent = conjugator('hours',
      (timer.hours === 1 || timer.hours === 21) ? 0 :
        ((timer.hours >= 2 && timer.hours <= 4) ||
          (timer.hours >= 22 && timer.hours <= 24)) ? 1 :
          2);

    minutesCell.firstElementChild.textContent = timer.minutes;
    minutesCell.lastElementChild.textContent = conjugator('minutes',
      timer.minutes % 10 === 1 && timer.minutes !== 11 ? 0 :
      ((timer.minutes % 10 >= 2 && timer.minutes % 10 <= 4) &&
        !(timer.minutes >= 12 &&
        timer.minutes <= 14)) ? 1 : 2);

    const intervalId = setTimeout(startTimer, 60000);

    if (timer.timeRemaning <= 0) {
      clearInterval(intervalId);
      selector.remove();
      title.remove();
    }
  };
  startTimer();
};
