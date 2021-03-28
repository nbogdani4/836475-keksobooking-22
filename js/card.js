const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const PhotoSize = {
  WIDTH: 45,
  HEIGHT: 40,
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

function fillCardElementData(data, el, cb) {
  if (data) {
    cb();
  } else {
    el.remove();
  }
}

function getCard(author, offer) {
  const adCardElement = adCardTemplate.cloneNode(true);
  const {avatar} = author
  const {title, address, price, type, rooms, guests,
    checkin, checkout, features, description, photos} = offer

  const popupAvatar = adCardElement.querySelector('.popup__avatar');
  const popupTitle = adCardElement.querySelector('.popup__title');
  const popupTextAddress = adCardElement.querySelector('.popup__text--address');
  const popupTextPrice = adCardElement.querySelector('.popup__text--price');
  const popupType = adCardElement.querySelector('.popup__type');
  const popupTextCapacity = adCardElement.querySelector('.popup__text--capacity');
  const popupTextTime = adCardElement.querySelector('.popup__text--time');
  const popupFeatures = adCardElement.querySelector('.popup__features');
  const popupDescription = adCardElement.querySelector('.popup__description');
  const popupPhotos = adCardElement.querySelector('.popup__photos');



  fillCardElementData(avatar, popupAvatar, () => {
    popupAvatar.src = avatar;
  });
  fillCardElementData(title, popupTitle, () => {
    popupTitle.textContent = title;
  });
  fillCardElementData(address, popupTextAddress, () => {
    popupTextAddress.textContent = title;
  });
  fillCardElementData(price, popupTextPrice, () => {
    popupTextPrice.textContent = `${price} ₽/ночь`;
  });
  fillCardElementData(type, popupType, () => {
    popupType.textContent = offerTypes[type];
  });
  fillCardElementData(rooms >= 0 && guests >= 0, popupTextCapacity, () => {
    popupTextCapacity.textContent = `${rooms} комнаты для ${guests} гостей.`;
  });
  fillCardElementData(checkin && checkout, popupTextTime, () => {
    popupTextTime.textContent = `Заезд после ${checkin} выезд до ${checkout}`;
  });
  fillCardElementData(features, popupFeatures, () => {
    popupFeatures.textContent = '';
    popupFeatures.append(getFeaturesFragment(features));
  });
  fillCardElementData(description, popupDescription, () => {
    popupDescription.textContent = description;
  });
  fillCardElementData(photos, popupPhotos, () => {
    popupPhotos.textContent = '';
    popupPhotos.append(getPhotosFragment(photos));
  });
  return adCardElement
}

export {
  getCard
}
