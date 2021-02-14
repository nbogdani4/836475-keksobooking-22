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

export{
  genRandomIntFromRange,
  genRandomFloatFromRange,
  getRandomValue,
  getArrRandomValue,
  shuffleArray,
  addLeadingZero
}
