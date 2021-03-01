import {genRandomIntFromRange, genRandomFloatFromRange, getRandomValue,
  getArrRandomValue, shuffleArray} from './utils.js'

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TIME = ['12:00', '13:00', '14:00'];
const AVATAR_COUNT = 8;
const SIMILAR_AD_COUNT = 10;
const NUMBER_COUNT_AFTER_POINT = 5;
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
  'min': 1000,
  'max': 10000,
};
const ROOMS = {
  'min': 2,
  'max': 5,
};
const GUESTS = {
  'min': 5,
  'max': 10,
};

function createAd() {
  const locationX = genRandomFloatFromRange(LOCATION.x.min, LOCATION.x.max, NUMBER_COUNT_AFTER_POINT);
  const locationY = genRandomFloatFromRange(LOCATION.y.min, LOCATION.y.max, NUMBER_COUNT_AFTER_POINT);

  return {
    'author': {
      'avatar': 'img/avatars/user0'+ genRandomIntFromRange(1, AVATAR_COUNT) +'.png',
    },
    'offer': {
      'title': 'Выдуманный заголовок',
      'address': locationX + ', ' + locationY,
      'price': genRandomIntFromRange(PRICE.min, PRICE.max),
      'type': getRandomValue(TYPES),
      'rooms': genRandomIntFromRange(ROOMS.min, ROOMS.max),
      'guests': genRandomIntFromRange(GUESTS.min, GUESTS.max),
      'checkin': getRandomValue(TIME),
      'checkout': getRandomValue(TIME),
      'features': getArrRandomValue(shuffleArray(FEATURES)),
      'description': 'Текс, описывающий помещение',
      'photos': getArrRandomValue(PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
  };
}

const createAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

export {createAds}
