/* global L:readonly */
import {activateForm, setAddressValue, getDefaultLatLng} from './form.js'
import {getCard} from './card.js'
import {getData} from './api.js'

const zoom = 10;

// map
const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView(getDefaultLatLng(), zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// main pin
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
  ads.forEach(({author, offer, location}) => {
    getPinMarker(location)
      .addTo(map)
      .bindPopup(
        getCard(author, offer),
        {
          keepInView: true,
        },
      )
  });
}

getData((ads) => {
  renderPins(ads);
})

export {
  movePinTo
}
