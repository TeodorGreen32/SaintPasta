$('.banner__slider').slick({
  arrows: false,
  dots: true,
  fade: true,
  autoplay: true,
  autoplaySpeed: 2500,
});

$('.team-slider__main-box').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.team-slider__min',
  fade: true,
  nextArrow: $('.team-slider__arrow-right'),
  prevArrow: $('.team-slider__arrow-left'),
});
$('.team-slider__min').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.team-slider__main-box',
  focusOnSelect: true,
  vertical: true,
});


