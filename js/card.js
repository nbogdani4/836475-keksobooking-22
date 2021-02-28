
import {createAds} from './data.js'

const PHOTO_SIZE = {
  width: '45',
  height: '40',
};
const map = document.querySelector('#map-canvas');
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

function getFeaturesFragment(features) {
  const featuresListFragment = document.createDocumentFragment();

  features.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + item );
    featuresListFragment.append(li);
  });
  return featuresListFragment;
}

function getPhotosFragment(links) {
  const photoListFragment = document.createDocumentFragment();

  links.forEach((link) => {
    const img = document.createElement('img');
    img.alt = 'Фотография жилья';
    img.classList.add('popup__photo')
    img.width = PHOTO_SIZE.width;
    img.height = PHOTO_SIZE.height;
    photoListFragment.append(img);
    img.src = link;
  });
  return photoListFragment
}

const similarAds = createAds[0];
const adCardElement = adCardTemplate.cloneNode(true);
adCardElement.querySelector('.popup__avatar').src = similarAds.author.avatar;
adCardElement.querySelector('.popup__title').textContent = similarAds.offer.title;
adCardElement.querySelector('.popup__text--address').textContent = similarAds.offer.address;
adCardElement.querySelector('.popup__text--price').textContent = similarAds.offer.price + ' ₽/ночь';
adCardElement.querySelector('.popup__type').textContent = offerTypes[similarAds.offer.type];
adCardElement.querySelector('.popup__text--capacity').textContent = similarAds.offer.rooms + ' комнаты для ' + similarAds.offer.guests + ' гостей.';
adCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAds.offer.checkin + ', выезд до ' + similarAds.offer.checkout;
adCardElement.querySelector('.popup__features').textContent = ''
adCardElement.querySelector('.popup__features').append(getFeaturesFragment(similarAds.offer.features))
adCardElement.querySelector('.popup__description').textContent = similarAds.offer.description;
adCardElement.querySelector('.popup__photos').textContent = ''
adCardElement.querySelector('.popup__photos').append(getPhotosFragment(similarAds.offer.photos));
map.appendChild(adCardElement);
