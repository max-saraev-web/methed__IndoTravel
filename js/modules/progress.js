const progress = () => {
  const img = document.createElement('div');
  let isRendered = false;
  let direction = window.scrollY;
  let up = null;

  const detectScrollDirection = () => {
    const currentScrollPosition = window.scrollY;
    currentScrollPosition > direction ? up = true : up = false;
    direction = currentScrollPosition;
  };

  img.classList.add('progress');

  img.style.cssText = `
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 25px;
    right: 12px;
    pointer-events: none;
    background: url('img/progress/airplane.svg') center/contain no-repeat;
    transition: all 0.1s ease-out;
    transform: rotate(360deg);
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
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percent = (window.scrollY * 100) / maxScroll;

    const top = maxTop * (percent / 100);
    img.style.transform =
      `translateY(-${top}px) 
        rotate(${!up ? 180 : 360}deg)`;
  };

  renderProgress(document.documentElement.scrollWidth);

  window.addEventListener('resize', () => {
    const screenWidth = document.documentElement.scrollWidth;
    renderProgress(screenWidth);
  });

  window.addEventListener('scroll', () => {
    detectScrollDirection();
    calcPositionFly();
  });
};

export default progress;
