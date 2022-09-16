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
const closeAdress = document.querySelector('.contscts__close-btn')
const adressCard = document.querySelector('.contscts__close-btn')

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