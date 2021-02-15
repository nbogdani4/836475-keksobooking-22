import {genRandomIntFromRange, genRandomFloatFromRange, getRandomValue,
  getArrRandomValue, shuffleArray, addLeadingZero} from './utils.js'

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TIME = ['12:00', '13:00', '14:00'];
const AVATAR_COUNT = 8;
const NUMBER_COUNT_AFTER_POINT = 5;
const NUMBER_LENGTH_WITH_LEADING_ZERO = 2;
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const LOCATION = {
  'x': {
    'min': 35.65000,
    'max': 35.70000,
  },
  'y': {
    'min': 139.70000,
    'max': 139.80000,
  },
};
const PRICE = {
  'min': 50,
  'max': 100,
};
const ROOMS = {
  'min': 2,
  'max': 5,
};
const GUESTS = {
  'min': 5,
  'max': 10,
};

function getLocationX() {
  return genRandomFloatFromRange(LOCATION.x.min, LOCATION.x.max, NUMBER_COUNT_AFTER_POINT);
}

function getLocationY() {
  return genRandomFloatFromRange(LOCATION.y.min, LOCATION.y.max, NUMBER_COUNT_AFTER_POINT);
}

function getAvatarNumber() {
  return addLeadingZero(genRandomIntFromRange(1, AVATAR_COUNT), NUMBER_LENGTH_WITH_LEADING_ZERO)
}

function getPrice() {
  return genRandomIntFromRange(PRICE.min, PRICE.max)
}

function getType() {
  return getRandomValue(TYPES)
}

function getRoomCount() {
  return genRandomIntFromRange(ROOMS.min, ROOMS.max)
}

function getGuestCount() {
  return genRandomIntFromRange(GUESTS.min, GUESTS.max)
}

function getCheckTime() {
  return getRandomValue(TIME)
}

function getFeatures() {
  return getArrRandomValue(shuffleArray(FEATURES))
}

function getAdPhotos() {
  return getArrRandomValue(PHOTOS)
}

export {
  getLocationX, getLocationY, getAvatarNumber, getPrice, getType, getRoomCount, getGuestCount,
  getCheckTime, getFeatures, getAdPhotos
}
