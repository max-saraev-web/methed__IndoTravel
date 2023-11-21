const progress = () => {
  const img = document.createElement('div');
  let isRendered = false;


  img.classList.add('progress');

  img.style.cssText = `
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 25px;
    right: 12px;
    pointer-events: none;
    background: url('img/progress/airplane.svg') center/contain no-repeat;
  `;

  const renderProgress = width => {
    if (width < 758 && isRendered === true) {
      img.remove();
      isRendered = false;
    } else if (width >= 758 && isRendered === false) {
      document.body.append(img);
      isRendered = true;
    }
  };

  const calcPositionFly = () => {
    const docEl = document.documentElement;
    const maxTop = docEl.clientHeight - img.clientHeight - 25;
    console.log('docEl.clientHeight: ', docEl.clientHeight);
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percent = (window.scrollY * 100) / maxScroll;

    const top = maxTop * (percent / 100);
    img.style.transform = `translateY(-${top}px)`;
  };

  renderProgress(document.documentElement.scrollWidth);

  window.addEventListener('resize', () => {
    const screenWidth = document.documentElement.scrollWidth;
    renderProgress(screenWidth);
  });

  window.addEventListener('scroll', () => {
    calcPositionFly();
  });
};

export default progress;
