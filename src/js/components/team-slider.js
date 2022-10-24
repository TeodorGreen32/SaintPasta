const slickify = function () {
  $('.team-slider__min').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.team-slider__main-box',
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1081,
        settings: 'unslick',
      }
    ]
  });
}

$('.team-slider__main-box').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.team-slider__min',
  fade: true,
  nextArrow: $('.team-slider__arrow-right'),
  prevArrow: $('.team-slider__arrow-left'),
});


slickify();
$(window).resize(function () {
  const windowWidth = $(window).width();
  if (windowWidth > 1081) {
    slickify();
  }
});
