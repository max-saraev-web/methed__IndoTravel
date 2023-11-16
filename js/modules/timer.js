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

  const minutesSplitter = val => {
    if (val >= 10) {
      const str = val.toString();
      const num = +str.slice(1);

      return num === 1 ? 0 :
      (num > 1 && num < 5) ? 2 :
      (num >= 5) ? 1 :
      1;
    } else {
      return val === 1 ? 0 :
      (val > 1 && val < 5) ? 2 :
      (val >= 5) ? 1 :
      '';
    }
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

  const startTimer = () => {
    const timer = getTimeRemaning();

    const dayCell = selector.querySelector('.timer__item_days');
    const hourCell = selector.querySelector('.timer__item_hours');
    const minutesCell = selector.querySelector('.timer__item_minutes');

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
      minutesSplitter(timer.minutes));

    const intervalId = setTimeout(startTimer, 60000);

    if (timer.timeRemaning <= 0) {
      clearInterval(intervalId);
      selector.remove();
      title.remove();
    }
  };
  startTimer();
};
