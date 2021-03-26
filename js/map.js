/* global _:readonly */
/* global L:readonly */
import {activateForm, setAddressValue, getDefaultLatLng} from './form.js'
import {activateFilter, getFilteredAds, onFilterChange} from './filter.js'
import {getCard} from './card.js'
import {getData} from './api.js'

const ZOOM = 10;
const FILTER_DELAY = 500;
const PinIconUrl = {
  MAIN: './img/main-pin.svg',
  OTHER: './img/pin.svg',
}
const PinIconSize = {
  WIDTH: 52,
  HEIGHT: 52,
}
const PinIconAnchor = {
  X: 26,
  Y: 52,
}

// map
const map = L.map('map-canvas')
  .on('load', activateForm)
  .setView(getDefaultLatLng(), ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// main pin
const mainPinIcon = L.icon({
  iconUrl: PinIconUrl.MAIN,
  iconSize: [PinIconSize.WIDTH, PinIconSize.HEIGHT],
  iconAnchor: [PinIconAnchor.X, PinIconAnchor.Y],
});

const mainPin = L.marker(
  getDefaultLatLng(),
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

function onMoveendMainPin() {
  mainPin.on('moveend', (evt) => {
    setAddressValue(evt.target.getLatLng());
  });
}

function getMainPin() {
  onMoveendMainPin();
  return mainPin
}

function movePinTo({lat, lng}) {
  mainPin.setLatLng(new L.LatLng(lat, lng))
}

getMainPin().addTo(map);


// other pins
let pins = [];

function destroyPin(pinsList) {
  pinsList.forEach((pin) => {
    pin.remove();
  })
  pins = [];
}

const pinIcon = L.icon({
  iconUrl: PinIconUrl.OTHER,
  iconSize: [PinIconSize.WIDTH, PinIconSize.HEIGHT],
  iconAnchor: [PinIconAnchor.X, PinIconAnchor.Y],
});

function getPinMarker(location) {
  return L.marker(
    location,
    {
      icon: pinIcon,
    },
  );
}

function renderPins(ads) {
  destroyPin(pins);
  ads
    .filter(getFilteredAds)
    .forEach(({author, offer, location}) => {
      const pin = getPinMarker(location);
      pin
        .addTo(map)
        .bindPopup(
          getCard(author, offer),
          {
            keepInView: true,
          },
        );
      pins.push(pin);
    });
  activateFilter();
}

getData((ads) => {
  renderPins(ads);
  onFilterChange(_.debounce(() => renderPins(ads), FILTER_DELAY));
})


export {
  movePinTo
}
