import {showAlert} from './utils.js'
const Url = {
  GET_DATA: 'https://22.javascript.pages.academy/keksobooking/data',
  POST_DATA: 'https://22.javascript.pages.academy/keksobooking',
}

function getData(onSuccess) {
  fetch(Url.GET_DATA)
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
  fetch(Url.POST_DATA,
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
