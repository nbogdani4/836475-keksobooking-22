import {getRoundedNumber} from './utils.js'
import {sendData} from './api.js'
import {showSuccessMessage, showErrorMessage} from './message.js'
import {movePinTo} from './map.js'

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const address = adForm.querySelector('#address');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const priceType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const defaultLatLng = {
  lat: 35.652832,
  lng: 139.839478,
}

function getDefaultLatLng() {
  return defaultLatLng
}

function setMinPrice() {
  price.placeholder = priceType[type.value];
  price.min = priceType[type.value];
}

function setCapacityValue() {
  capacity.querySelectorAll('option').forEach((option) => {
    if (
      (+roomNumber.value === 100 && +option.value === 0) ||
      (+roomNumber.value !== 100 && +roomNumber.value >= +option.value && +option.value !== 0)
    ) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
  });
  checkCapacityToValidity();
}

function checkCapacityToValidity() {
  if (capacity.querySelector('option:checked').disabled) {
    capacity.setCustomValidity('The selected value is not available');
  } else {
    capacity.setCustomValidity('');
  }
}

function setTimeIn() {
  timeIn.value = timeOut.value;
}

function setTimeOut() {
  timeOut.value = timeIn.value;
}

function setAddressReadonly() {
  address.readOnly = true;
}

function setAddressValue({lat, lng}) {
  address.value = `${getRoundedNumber(lat, 5)}, ${getRoundedNumber(lng, 5)}`;
}

function onFormChange() {
  adForm.addEventListener('change', (evt) => {
    if (evt.target.id === 'type') {
      setMinPrice();
    }
    if (evt.target.id === 'room_number') {
      setCapacityValue();
    }
    if (evt.target.id === 'capacity') {
      checkCapacityToValidity()
    }
    if (evt.target.id === 'timein') {
      setTimeOut()
    }
    if (evt.target.id === 'timeout') {
      setTimeIn()
    }
  })
}

function isSuccess() {
  showSuccessMessage();
  resetForm();
}

function onFormSubmit() {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(isSuccess, showErrorMessage, new FormData(evt.target));
  })
}

function onFormReset() {
  const resetBtn = adForm.querySelector('.ad-form__reset');
  resetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  })
}


function disableFormElements() {
  adForm.querySelectorAll('fieldset').forEach((el) => {
    el.disabled = true;
  })
}

function activateFormElements() {
  adForm.querySelectorAll('fieldset').forEach((el) => {
    el.disabled = false;
  })
}

function resetForm() {
  adForm.reset();
  setAddressValue(defaultLatLng);
  movePinTo(defaultLatLng)
}

function disableForm() {
  adForm.classList.add('ad-form--disabled');
  disableFormElements();
}

function activateForm() {
  adForm.classList.remove('ad-form--disabled');
  setAddressValue(defaultLatLng);
  setMinPrice();
  setCapacityValue();
  onFormChange();
  onFormReset()
  setAddressReadonly();
  activateFormElements();
}


disableForm();
onFormSubmit();

export{
  activateForm,
  setAddressValue,
  getDefaultLatLng
}
