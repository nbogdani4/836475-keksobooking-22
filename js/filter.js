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


function onFilterChange(cb) {
  filter.addEventListener('change', cb)
}

function dispatchFilterEvent(evtType) {
  const event = new Event(evtType);
  filter.dispatchEvent(event);
}

function filtrateByHousingType(ad) {
  const housingTypeFilter = filter.querySelector('#housing-type');
  return housingTypeFilter.value === 'any' || housingTypeFilter.value === ad.offer.type;
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

function filtrateByHousingRooms(ad) {
  const housingRoomFilter = filter.querySelector('#housing-rooms');
  return housingRoomFilter.value === 'any' || Number(housingRoomFilter.value) === ad.offer.rooms;
}

function filtrateByHousingGuests(ad) {
  const housingGuestFilter = filter.querySelector('#housing-guests');
  return housingGuestFilter.value === 'any' || Number(housingGuestFilter.value) === ad.offer.guests;
}

function filtrateByHousingFeatures(ad) {
  const housingFeaturesFilters = Array.from(filter.querySelectorAll('.map__checkbox:checked'));

  return housingFeaturesFilters.every((filterItem) => {
    return ad.offer.features.includes(filterItem.value);
  });
}

function getFilteredAds(ad) {
  return filtrateByHousingType(ad) &&
    filtrateByHousingPrice(ad) &&
    filtrateByHousingRooms(ad) &&
    filtrateByHousingGuests(ad) &&
    filtrateByHousingFeatures(ad);
}

export{
  activateFilter,
  resetFilter,
  getFilteredAds,
  onFilterChange,
  dispatchFilterEvent
}
