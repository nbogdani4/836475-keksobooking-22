const filter = document.querySelector('.map__filters');

function disabledFilterElements() {
  filter.querySelectorAll('select, fieldset').forEach((el) => {
    el.disabled = true;
  })
}

function disableFilter() {
  disabledFilterElements();
  filter.classList.add('map__filters--disabled');
}

disableFilter();

