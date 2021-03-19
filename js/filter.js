const filter = document.querySelector('.map__filters');

function disabledFilterElements() {
  filter.querySelectorAll('select, fieldset').forEach((el) => {
    el.disabled = true;
  })
}

function activateFilterElements() {
  filter.querySelectorAll('select, fieldset').forEach((el) => {
    el.disabled = false;
  })
}

function disableFilter() {
  disabledFilterElements();
  filter.classList.add('map__filters--disabled');
}

function activateFilter() {
  activateFilterElements();
  filter.classList.remove('map__filters--disabled');
}

disableFilter();

export{
  activateFilter
}
