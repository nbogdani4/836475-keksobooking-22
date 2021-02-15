import {getLocationX, getLocationY, getAvatarNumber, getPrice, getType, getRoomCount, getGuestCount,
  getCheckTime, getFeatures, getAdPhotos} from './data.js'

function createAd() {
  const locationX = getLocationX();
  const locationY = getLocationY();

  return {
    'author': {
      'avatar': 'img/avatars/user'+ getAvatarNumber() +'.png',
    },
    'offer': {
      'title': 'Выдуманный заголовок',
      'address': locationX + ', ' + locationY,
      'price': getPrice(),
      'type': getType(),
      'rooms': getRoomCount(),
      'guests': getGuestCount(),
      'checkin': getCheckTime(),
      'checkout': getCheckTime(),
      'features': getFeatures(),
      'description': 'Текс, описывающий помещение',
      'photos': getAdPhotos(),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
  };
}

export {createAd}
