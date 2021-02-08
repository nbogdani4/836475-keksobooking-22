'use strict';

const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TIME = ['12:00', '13:00', '14:00'];
const AD_COUNT = 10;
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


function genRandomIntFromRange(min, max) {
  if (min < 0 || max <= min) {
    return new Error('Некорректно указан диапазон');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRandomFloatFromRange(min, max, numbersAfterPoint) {
  if (min < 0 || max <= min) {
    return new Error('Некорректно указан диапазон');
  }
  return (Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
}

function getRandomValue(arr) {
  return arr[genRandomIntFromRange(0, arr.length - 1)];
}

function getArrRandomValue(arr) {
  const arrLength = genRandomIntFromRange(1, arr.length)
  if (arrLength === 1) {
    return arr[0]
  }
  return arr.slice(0, arrLength)
}

function shuffleArray(arr) {
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

function addLeadingZero(number, newNumberLength) {
  return ('0'.repeat(newNumberLength) + number).slice(-newNumberLength);
}

function genSimilarAd(adCount) {
  let Adarr = [];

  for (let i = 0; i < adCount; i++) {
    const locationX = genRandomFloatFromRange(LOCATION.x.min, LOCATION.x.max, NUMBER_COUNT_AFTER_POINT);
    const locationY = genRandomFloatFromRange(LOCATION.y.min, LOCATION.y.max, NUMBER_COUNT_AFTER_POINT);
    const similarAd = {
      'author': {
        'avatar': 'img/avatars/user'+ addLeadingZero(genRandomIntFromRange(1, AVATAR_COUNT), NUMBER_LENGTH_WITH_LEADING_ZERO) +'.png',
      },
      'offer': {
        'title': 'Выдуманный заголовок',
        'address': locationX + ', ' + locationY,
        'price': genRandomIntFromRange(PRICE.min, PRICE.max),
        'type': getRandomValue(TYPE),
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

    Adarr.push(similarAd);
  }

  return Adarr
}


genSimilarAd(AD_COUNT)();
