import {getFormTour as form} from './getElems.js';

const tourDate = form.querySelector('#tour__date');
const tourPeople = form.querySelector('#tour__people');

const getDb = async () => {
  const result = await fetch('db.json');
  const data = await result.json();
  return data;
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

  const peopleElems = data.map(elem => {
    const option = document.createElement('option');
    option.classList.add('tour__option');
    option.value = `${elem['min-people']} - ${elem['max-people']}`;
    option.textContent = `${elem['min-people']} - ${elem['max-people']}`;
    return option;
  });

  tourDate.append(...dateElems);
  tourPeople.append(...peopleElems);
};

export default formTour;
