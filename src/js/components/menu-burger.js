const header = document.querySelector('.header');
const menuBurger = header.querySelector('.menu-burger');
const menuList = header.querySelector('.menu__list');
const headerPhone = header.querySelector('.header__phone-wrapper');
const body = document.querySelector('.body');
const banner = document.querySelector('.banner');

const toggleBurgerMenu = function () {
  header.classList.toggle('header--active');
  menuList.classList.toggle('menu__list--active');
  headerPhone.classList.toggle('header__phone-wrapper--active');
  body.classList.toggle('body--active');
}

menuBurger.addEventListener('click', toggleBurgerMenu);

header.addEventListener('click', function (e) {
  if (!e.target.classList.contains('header--active') && !e.target.classList.contains('menu__link')) return;

  toggleBurgerMenu();
})

const stickyHeader = function (entries, observer) {
  if (!entries[0].isIntersecting)
    header.classList.add('header--sticky');
  else
    header.classList.remove('header--sticky');
}
const headerObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
});
headerObserver.observe(banner);