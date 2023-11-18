export const accordion = ({buttons, items, wrappers}) => {
  let wrapperHeight = 0;

  wrappers.forEach(wrap => {
    if (wrapperHeight < wrap.scrollHeight) {
      wrapperHeight = wrap.scrollHeight;
    }
  });

  items.forEach((item, i) => {
    if (item.classList.contains('travel__item_active')) {
      wrappers[i].style.height = `${wrapperHeight}px`;
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
    });
  });
};
