/* global L:readonly */
import {getCityLatLng, getAdDataList} from './data.js'
import {activateForm} from './form.js'
import {getMainPinMarker, getPinMarker} from './pin.js'
import {getCard} from './card.js'


const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView(getCityLatLng(), 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

getMainPinMarker().addTo(map);

getAdDataList().forEach(({author, offer, location}) => {
  const pinMarker = getPinMarker(location);
  pinMarker
    .addTo(map)
    .bindPopup(
      getCard(author, offer),
      {
        keepInView: true,
      },
    )
});

export{
  map,
  getCityLatLng
}
