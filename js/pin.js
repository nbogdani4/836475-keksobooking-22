/* global L:readonly */
// import {data} from './data.js'
// import {getCard} from './card.js'
import {getCityLatLng} from './data.js'
import {setAddressValue} from './form.js'

// main pin
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  getCityLatLng(),
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

function onMoveendMainPinMarker() {
  mainPinMarker.on('moveend', (evt) => {
    setAddressValue(evt.target.getLatLng());
  });
}

function getMainPinMarker() {
  onMoveendMainPinMarker();
  return mainPinMarker
}

// other pin
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

function getPinMarker(location) {
  return L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: pinIcon,
    },
  );
}

export {
  getMainPinMarker,
  getPinMarker
}
