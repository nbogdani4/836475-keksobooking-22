const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const PhotoSize = {
  WIDTH: '45',
  HEIGHT: '40',
}
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
    img.width = PhotoSize.WIDTH;
    img.height = PhotoSize.HEIGHT;
    photoListFragment.append(img);
    img.src = link;
  });
  return photoListFragment
}

function getCard(author, offer) {
  const adCardElement = adCardTemplate.cloneNode(true);
  adCardElement.querySelector('.popup__avatar').src = author.avatar;
  adCardElement.querySelector('.popup__title').textContent = offer.title;
  adCardElement.querySelector('.popup__text--address').textContent = offer.address;
  adCardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  adCardElement.querySelector('.popup__type').textContent = offerTypes[offer.type];
  adCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
  adCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  adCardElement.querySelector('.popup__features').textContent = ''
  adCardElement.querySelector('.popup__features').append(getFeaturesFragment(offer.features))
  adCardElement.querySelector('.popup__description').textContent = offer.description;
  adCardElement.querySelector('.popup__photos').textContent = ''
  adCardElement.querySelector('.popup__photos').append(getPhotosFragment(offer.photos));
  return adCardElement
}

export {
  getCard
}
