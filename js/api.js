import {showAlert} from './utils.js'
const ADS_MAX_COUNT = 10;
const Url = {
  GET_DATA: 'https://22.javascript.pages.academy/keksobooking/data',
  POST_DATA: 'https://22.javascript.pages.academy/keksobooking',
}

async function getData(onSuccess) {
  fetch(Url.GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить данные с сервера. Попробуйте позже.');
    })
    .then((ads) => onSuccess(ads.slice(0, ADS_MAX_COUNT)))
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
