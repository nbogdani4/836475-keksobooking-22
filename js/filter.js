const PRICE_UNTIL = 10000;
const PRICE_FROM = 50000;

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

function resetFilter() {
  filter.reset();
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


function updatePinsRendering(cb) {
  filter.addEventListener('change', cb)
}

function filtrateByHousingType(ad) {
  const housingTypeFilter = filter.querySelector('#housing-type');
  return housingTypeFilter.value === 'any' || ad.offer.type === housingTypeFilter.value;
}

function filtrateByHousingPrice(ad) {
  const housingPriceFilter = filter.querySelector('#housing-price');
  let adPrice = '';
  if (ad.offer.price < PRICE_UNTIL) {
    adPrice = 'low';
  } else if (ad.offer.price >= PRICE_UNTIL && ad.offer.price < PRICE_FROM) {
    adPrice = 'middle';
  } else {
    adPrice = 'high'
  }
  return housingPriceFilter.value === 'any' || housingPriceFilter.value === adPrice;
}

function filtrateAds(ad) {
  return filtrateByHousingType(ad) && filtrateByHousingPrice(ad);
}

export{
  activateFilter,
  resetFilter,
  filtrateAds,
  updatePinsRendering
}
