const ALERT_SHOW_TIME = 7000;
const ESC_KEYCODE = 27;


function getRoundedNumber(value, quantity) {
  if (Number.isInteger(value)) {
    return value.toFixed();
  }
  return value.toFixed(quantity);
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = '#ffffff';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function isEscPressed(evt) {
  return evt.keyCode === ESC_KEYCODE
}

export{
  getRoundedNumber,
  showAlert,
  isEscPressed
}
