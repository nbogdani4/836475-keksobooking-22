import {isEscPressed} from './utils.js'

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const page = document.querySelector('main');

function hideSuccessMessage(evt) {
  if (evt.type === 'click' || isEscPressed(evt)) {
    const successMessage = page.querySelector('.success');
    successMessage.removeEventListener('click', hideSuccessMessage);
    document.removeEventListener('keydown', hideSuccessMessage);
    successMessage.remove();
  }
}

function showSuccessMessage() {
  const successMessage = successTemplate.cloneNode(true);
  page.append(successMessage);
  successMessage.addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', hideSuccessMessage);
}


function hideErrorMessage(evt) {
  if (evt.type === 'click' || isEscPressed(evt)) {
    const errorMessage = page.querySelector('.error');
    const closeBtn = errorMessage.querySelector('.error__button');

    closeBtn.removeEventListener('click', hideErrorMessage);
    errorMessage.removeEventListener('click', hideErrorMessage);
    document.removeEventListener('keydown', hideErrorMessage);
    errorMessage.remove();
  }
}

function showErrorMessage() {
  const errorMessage = errorTemplate.cloneNode(true);
  const closeBtn = errorMessage.querySelector('.error__button');

  page.append(errorMessage)
  closeBtn.addEventListener('click', hideErrorMessage);
  errorMessage.addEventListener('click', hideErrorMessage);
  document.addEventListener('keydown', hideErrorMessage);
}

export {
  showSuccessMessage,
  showErrorMessage
}
