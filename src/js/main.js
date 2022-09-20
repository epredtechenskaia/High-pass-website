ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.76813181678127, 37.63217440734743],
        zoom: 14,
        controls: []
    });

    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.769535, 37.639985]
        }
    });

    var myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/point.png',
        iconImageSize: [12, 12],
    });

    myMap.geoObjects.add(myPlacemark);
}


const searchOpen = document.querySelector('.header__search-btn-one')
const search = document.querySelector('.header__search-two')
const searchClose = document.querySelector('.header__search-btn')
const closeAdress = document.querySelector('.contacts__close-btn')
const adressCard = document.querySelector('.contacts__adress-wrapper')

searchOpen.addEventListener('click', () => {
    searchOpen.classList.add('btn--hidden');
    search.classList.add('search--open');
})

searchClose.addEventListener('click', () => {
    searchOpen.classList.remove('btn--hidden');
    search.classList.remove('search--open');
})

closeAdress.addEventListener('click', () => {
    adressCard.classList.add('btn--hidden');
})

// BURGER 

const burger = document.querySelector('.header__burger')
const nav = document.querySelector('.header__nav')
const navItems = nav.querySelectorAll('.header__link')
const list = document.querySelector('.header__list')
const closeMenu = document.querySelector('.header__close-menu')
const phone = document.querySelector('.header__phone')
const body = document.body


burger.addEventListener('click', () => {
    body.classList.toggle('stop-scroll')
    burger.classList.toggle('header__burger--active')
    nav.classList.toggle('header__nav--visible')
    list.classList.toggle('header__list--visible')
    closeMenu.classList.toggle('header__close-menu--active')
    phone.classList.toggle('header__phone--active')
})

closeMenu.addEventListener('click', () => {
    body.classList.remove('stop-scroll')
    burger.classList.remove('header__burger--active')
    nav.classList.remove('header__nav--visible')
    list.classList.remove('header__list--visible')
    closeMenu.classList.remove('header__close-menu--active')
    phone.classList.remove('header__phone--active')
})

navItems.forEach(el => {
    el.addEventListener('click', () => {
        body.classList.remove('stop-scroll')
        burger.classList.remove('header__burger--active')
        nav.classList.remove('header__nav--visible')
        list.classList.remove('header__list--visible')
        closeMenu.classList.remove('header__close-menu--active')
        phone.classList.remove('header__phone--active')
    })
})

// SMOOTH SCROLL 

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// close address
const closeAddress = document.querySelector('.contscts__close-btn')
const addressCard = document.querySelector('.contacts__adress-wrapper')

closeAddress.addEventListener('click', () => {
    addressCard.classList.toggle('contacts__adress-wrapper--close')
})