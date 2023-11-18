export const accordion = ({accordion, buttons, items, wrappers}) => {
  let wrapperHeight = 0;

  wrappers.forEach(elem => {
    if (wrapperHeight < elem.scrollHeight) {
      wrapperHeight = elem.scrollHeight;
    }
  });

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      items.forEach((elem, i) => {
        if (index === i) {
          wrappers[i].style.height =
          items[i].classList.contains('travel__item_active') ?
            '' : `${wrapperHeight}px`;
        } else {
          items[i].classList.remove('travel__item_active');
          wrappers[i].style.height = '';
        }
      });
      // items[index].classList.toggle('travel__item_active');
    });
  });
};
