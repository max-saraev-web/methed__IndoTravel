import {getFooterForm} from './getElems.js';
import fetchRequest from './networking/fetchRequest.js';


const formElems = getFooterForm();
const {
  form,
  title,
  paragraph,
} = formElems;

const footerForm = URL => {
  const validator = new JustValidate(form);
  validator
    .addField(form.footerEmail, [
      {
        rule: 'email',
      },
      {
        validator(ev) {
          console.log(form.footerEmail.value);
          return !!(/(\w+)@(\w{3,})\.(\w{2,})/gim.test(form.footerEmail.value));
        },
        errorMessage: 'Введите валидную почту!',
      },
    ])
    .onSuccess(async ev => {
      ev.preventDefault();

      await fetchRequest(URL, {
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
