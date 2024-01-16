const sliderInit = (selector, {next, prev, slides}) => {
  new Swiper(`${selector}`, {
  // mousewheel: true,
    keyboard: true,
    loop: true,
    slidesPerView: `${slides}`,
    navigation: {
      nextEl: `${next}`,
      prevEl: `${prev}`,
    },
});
};

export default sliderInit;
