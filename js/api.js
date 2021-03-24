import {showAlert} from './utils.js'

function getData(onSuccess) {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить данные с сервера. Попробуйте позже.');
    })
    .then((ads) => onSuccess(ads))
    .catch((err) => showAlert(err));
}

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      onFail();
    });

}

export {
  getData,
  sendData
}
