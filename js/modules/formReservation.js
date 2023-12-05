import {getFormReservation as form} from './getElems.js';
import fetchRequest from './networking/fetchRequest.js';
import {createDefaultOption, getDb, loadStyles} from './utility.js';


const tourDate = form.querySelector('#reservation__date');
const tourPeople = form.querySelector('#reservation__people');
const submitBtn = form.querySelector('.reservation__button');
const infoText = form.querySelector('.reservation__data');
const infoPrice = form.querySelector('.reservation__price');

let price = 0;

const reservationForm = async URL => {
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

  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    const target = ev.target;
    const totalPrice = target.querySelector('.reservation__price');

    const fields = new FormData(target);
    const formObj = Object.fromEntries(fields);

    const confirmationModal = async ({
      dates,
      people,
    }) => {
      await loadStyles('css/modal.css');

      const modal = document.createElement('div');
      modal.classList.add('overlay', 'overlay_confirm');
      modal.innerHTML = `
          <div class="modal">
          <h2 class="modal__title">Подтверждение заявки</h2>
          <p class="modal__text">
            Бронирование путешествия в Индию на ${people} человек</p>
          <p class="modal__text">В даты: ${dates}</p>
          <p class="modal__text">Стоимость тура ${totalPrice.textContent}</p>
          <div class="modal__button">
            <button class="modal__btn modal__btn_confirm">Подтверждаю</button>
            <button class="modal__btn modal__btn_edit">
              Изменить данные</button>
          </div>
        </div>
      `;
      document.body.append(modal);

      document.documentElement.style.overflow = 'hidden';

      const btnGroup = modal.querySelector('.modal__button');

      return new Promise((resolve) => {
        btnGroup.addEventListener('click', ({target}) => {
          if (target.matches('.modal__btn_confirm')) {
            resolve(true);
            modal.remove();
            document.documentElement.style.overflow = 'scroll';
          }
          if (target.matches('.modal__btn_edit')) {
            resolve(false);
            modal.remove();
            document.documentElement.style.overflow = 'scroll';
          }
        });
      });
    };

    const isConfirmed = await confirmationModal(formObj);

    if (isConfirmed) {
      fetchRequest(URL, {
        method: 'POST',
        body: formObj,
        headers: {
          'Content-Type': 'application/json',
        },
        async callback(err, data) {
          await loadStyles('../../css/modal.css');

          const modalOverlay = document.createElement('div');
          modalOverlay.classList.add('reserve-modal');
          modalOverlay.style.cssText = `
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: black;
          z-index: 9;
        `;

          const modalContent = document.createElement('div');
          modalContent.classList.add('reserve-modal__body');
          modalContent.style.cssText = `
          max-width: 980px;
          padding: 77px 200px;
          border-radius: 30px;
          background: #FFF;
          border: 1px solid var(#AFAFAF);
          position: relative;
        `;

          const modalClose = document.createElement('button');
          modalClose.classList.add('reserve-modal__close');
          modalClose.style.cssText = `
          position: absolute;
          width: 30px;
          height: 30px;
          right: 200px;
          top: 77px;
          background: center / cover 
          no-repeat url('../../img/form/closeBtn.svg')
        `;

          const modalTitle = document.createElement('span');
          modalTitle.classList.add('reserve-modal__title');
          modalTitle.style.cssText = `
          display: block;
          margin-bottom: 40px;
          font-family: Merriweather;
          text-align: center;
          color: #303030;
          font-size: 34px;
          font-weight: 400;
          line-height: 150%;
          letter-spacing: 0.68px;
        `;

          const modalText = document.createElement('p');
          modalText.classList.add('reserve-modal__text');
          modalText.style.cssText = `
            color: #303030;
            text-align: center;
            font-family: Nunito;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%; 
            margin-bottom: 64px;
          `;

          const modalImg = document.createElement('img');
          modalImg.src = '../../img/form/Ok.svg';
          modalImg.style.cssText = `
            margin: 0 auto;
            width: 100px;
            height: 100px;
          `;

          const modalBtn = document.createElement('button');
          modalText.classList.add('reserve-modal__btn-resend');
          modalBtn.style.cssText = `
            display: block;
            margin: 0 auto;
            border-radius: 12px;
            background: #FCB500;
            width: 360px;
            height: 76px;
            padding: 24px 112px;
            color: #FFF;
            font-family: Nunito;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 150%;
          `;
          modalBtn.textContent = 'Забронировать';


          if (!err) {
            modalTitle.textContent = 'Ваша заявка успешно отправлена',
            modalText.textContent =
              'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
            modalBtn.style.display = 'none';
            formObj.price = totalPrice.textContent;
            submitBtn.disabled = true;
            tourPeople.disabled = true;
            infoText.textContent = 'Дата и количество отдыхающих';
            infoPrice.textContent = 'Стоймость в ₽';
          } else {
            modalTitle.textContent = 'Упс... Что-то пошло не так',
            modalText.textContent =
            'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
            modalImg.style.display = 'none';
          }

          document.documentElement.style.overflow = 'hidden';

          modalContent.append(modalClose, modalTitle, modalText, modalImg,
            modalBtn);
          modalOverlay.append(modalContent);
          document.body.append(modalOverlay);

          modalClose.addEventListener('click', () => {
            modalOverlay.remove();
            document.documentElement.style.overflow = 'scroll';
          });

          modalBtn.addEventListener('click', () => {
            modalOverlay.remove();
            document.documentElement.style.overflow = 'scroll';
          });
          if (!err) target.reset();
        },
      });
    }
  });
};

export default reservationForm;
