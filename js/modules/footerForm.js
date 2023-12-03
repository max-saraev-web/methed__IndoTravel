import {getFooterForm} from './getElems.js';
import fetchRequest from './networking/fetchRequest.js';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const formElems = getFooterForm();
const {
  form,
  btn,
  title,
  paragraph,
} = formElems;

const footerForm = () => {
  btn.disabled = true;

  form.addEventListener('input', ({target}) => {
    if (target.value.trim() !== '') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    fetchRequest(URL, {
      method: 'POST',
      body: {
        'userEmail': `${form.footerEmail.value}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      callback(err, data) {
        if (!err) {
          title.textContent = 'Ваша заявка успешно отправлена',
          paragraph.textContent =
            'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
        } else {
          title.textContent = 'Произошла ошибка',
          paragraph.textContent = `${err}`;
        }
      },
    });
    form.reset();
  });
};

export default footerForm;
