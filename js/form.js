const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const priceType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

function setMinPrice() {
  price.placeholder = priceType[type.value];
  price.min = priceType[type.value];
}

function setTimeIn() {
  timeIn.value = timeOut.value;
}

function setTimeOut() {
  timeOut.value = timeIn.value;
}

function onFormChange() {
  adForm.addEventListener('change', (evt) => {
    if (evt.target.id == 'type') {
      setMinPrice(evt.target.value);
    }
    if (evt.target.id == 'timein') {
      setTimeOut()
    }
    if (evt.target.id == 'timeout') {
      setTimeIn()
    }

  })
}

function disableFormElements() {
  adForm.querySelectorAll('fieldset').forEach((el) => {
    el.disabled = true;
  })
}

function disableForm() {
  disableFormElements();
  adForm.classList.add('ad-form--disabled');
}

disableForm();
