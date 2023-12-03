import {getFormTour as form} from './getElems.js';
import {createDefaultOption, getDb} from './utility.js';

const tourDate = form.querySelector('#tour__date');
const tourPeople = form.querySelector('#tour__people');
const submitBtn = form.querySelector('.tour__button');
let price = 0;


const createTimerText = () => {
  const span = document.createElement('span');
  span.classList.add('price-calc__timer');
  span.textContent = '60 секунд';
  return span;
};

const formTour = async () => {
  const data = await getDb();
  const dateElems = data.map(elem => {
    const option = document.createElement('option');
    option.classList.add('tour__option');
    option.value = `${elem.date}`;
    option.textContent = elem.date;
    return option;
  });

  tourDate.append(...dateElems);


  tourPeople.disabled = true;
  submitBtn.disabled = true;

  tourDate.addEventListener('change', ({target}) => {
    tourPeople.disabled = false;
    tourPeople.innerHTML = '';
    if (target.value.length === 0) {
      submitBtn.disabled = true;
      tourPeople.innerHTML = '';
      tourPeople.append(createDefaultOption('Количество человек'));
      tourPeople.disabled = true;
    } else {
      const range = [];

      data.forEach(elem => {
        if (elem.date.startsWith(target.value)) {
          price = elem.price;
          const begin = elem['min-people'];
          const end = elem['max-people'];

          for (let i = begin; i <= end; i++) {
            range.push(i);
          }
        }
      });

      const peopleElems = range.map(num => {
        const option = document.createElement('option');
        option.classList.add('tour__option');
        option.value = `${num}`;
        option.textContent = `${num}`;
        return option;
      });
      tourPeople.append(createDefaultOption('Количество человек'),
        ...peopleElems);
    }
  });
  tourPeople.addEventListener('change', ({target}) => {
    if (target.value !== 'Количество человек') {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });
  form.addEventListener('submit', ev => {
    ev.preventDefault();

    const target = ev.target;
    const data = new FormData(target);
    const obj = Object.fromEntries(data);

    const formModal = () => {
      const modal = document.createElement('div');
      modal.classList.add('price-calc');
      modal.style.cssText = `
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 999;
      `;

      const modalContent = document.createElement('div');
      modalContent.classList.add('price-calc__body');
      modalContent.style.cssText = `
        max-width: 980px;
        padding: 77px 200px;
        border-radius: 30px;
        background: #FFF;
        border: 1px solid var(#AFAFAF);
        position: relative;
      `;

      const modalClose = document.createElement('button');
      modalClose.classList.add('price-calc__close');
      modalClose.style.cssText = `
        position: absolute;
        width: 30px;
        height: 30px;
        right: 200px;
        top: 77px;
        background: center / cover 
          no-repeat url('../../img/form/closeBtn.svg')
      `;
      modalContent.append(modalClose);

      const modalText = document.createElement('span');
      modalText.classList.add('price-calc__text');
      modalText.style.cssText = `
        text-align: center;
        color: var(#303030);
        font-size: 34px;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 0.68px;
      `;
      modalText.textContent = `
        Вы выбрали тур в временном промежутке: ${obj.dates}.
        
        Количество отдыхающих: ${obj.people}.

        Стоймость тура: ${price * obj.people}р.

        Окно закроется через:
      `;
      modalText.append(createTimerText());

      modalContent.append(modalText);
      modal.append(modalContent);
      document.body.append(modal);
    };
    document.documentElement.style.overflow = 'hidden';
    formModal();

    const modal = document.querySelector('.price-calc');
    const closeBtn = document.querySelector('.price-calc__close');
    const output = document.querySelector('.price-calc__timer');

    const start = new Date().getTime();

    const modalTimer = () => {
      const secondsPassed = Math.floor((Date.now() - start) / 1000);
      const secondsLeft = Math.max(0, 60 - secondsPassed);
      output.textContent = `${secondsLeft} секунд!`;

      if (secondsPassed >= 60) {
        submitBtn.disabled = true;
        tourPeople.disabled = true;
        clearInterval(formTimerId);
        modal.remove();
        form.reset();
        document.documentElement.style.overflow = 'scroll';
      }
    };

    closeBtn.addEventListener('click', () => {
      submitBtn.disabled = true;
      tourPeople.disabled = true;
      modal.remove();
      form.reset();
      document.documentElement.style.overflow = 'scroll';
    });

    const formTimerId = setInterval(modalTimer, 1000);
  });
};

export default formTour;
