function getRandomIntFromRange(min, max) {
  const CORRECTION_NUMBER = 1;

  if (min < 0 || max <= min) {
    return new Error('Некорректно указан диапазон');
  }
  return Math.floor(Math.random() * (max - min + CORRECTION_NUMBER)) + min;
}


function getRandomFloatFromRange(min, max, numbersAfterPoint) {
  if (min < 0 || max <= min) {
    return new Error('Некорректно указан диапазон');
  }
  return (Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
}


getRandomIntFromRange(0, 14);
getRandomFloatFromRange(1.1, 1.2, 1);
