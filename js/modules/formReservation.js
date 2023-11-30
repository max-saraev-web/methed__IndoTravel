import {getFormReservation as form} from './getElems.js';
import {createDefaultOption, getDb} from './utility.js';

const tourDate = form.querySelector('#reservation__date');
const tourPeople = form.querySelector('#reservation__people');
const submitBtn = form.querySelector('.reservation__button');
const infoText = form.querySelector('.reservation__data');
const infoPrice = form.querySelector('.reservation__price');

let price = 0;

const reservationForm = async () => {
  const data = await getDb();

  const dateElems = data.map(elem => {
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.value = `${elem.date}`;
    option.textContent = elem.date;
    return option;
  });

  tourDate.append(...dateElems);

  infoText.textContent = 'Дата и количество отдыхающих';
  infoPrice.textContent = 'Стоймость в ₽';
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
      infoText.textContent = 'Дата и количество отдыхающих';
    } else {
      infoText.textContent = 'Дата и количество отдыхающих';
      infoPrice.textContent = 'Стоймость в ₽';
      infoText.textContent = `${target.value}`;
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
      infoText.textContent = tourDate.value;
      infoText.textContent += `, ${target.value} человека`;
      infoPrice.textContent = `${price * target.value} ₽`;
    } else {
      submitBtn.disabled = true;
      infoText.textContent = 'Дата и количество отдыхающих';
      infoPrice.textContent = 'Стоймость в ₽';
    }
  });
};

export default reservationForm;

{/* <option value="4.02 - 18.02" class="tour__option reservation__option">4.02 - 18.02</option>
<option value="7.02 - 21.02" class="tour__option reservation__option">7.02 - 21.02</option>
<option value="12.02 - 26.02" class="tour__option reservation__option">12.02 - 26.02</option>
<option value="20.02 - 6.03" class="tour__option reservation__option">20.02 - 6.03</option> */}