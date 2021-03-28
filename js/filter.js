const PRICE_UNTIL = 10000;
const PRICE_FROM = 50000;
const MAX_ADS_COUNT = 10;
const FilterValue = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
  ALL: 'any',
}

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
  return housingTypeFilter.value === FilterValue.ALL || housingTypeFilter.value === ad.offer.type;
}

function filtrateByHousingPrice(ad) {
  const housingPriceFilter = filter.querySelector('#housing-price');
  let adPrice = '';
  if (ad.offer.price < PRICE_UNTIL) {
    adPrice = FilterValue.LOW;
  } else if (ad.offer.price >= PRICE_UNTIL && ad.offer.price < PRICE_FROM) {
    adPrice = FilterValue.MIDDLE;
  } else {
    adPrice = FilterValue.HIGH;
  }
  return housingPriceFilter.value === FilterValue.ALL || housingPriceFilter.value === adPrice;
}

function filtrateByHousingRooms(ad) {
  const housingRoomFilter = filter.querySelector('#housing-rooms');
  return housingRoomFilter.value === FilterValue.ALL || Number(housingRoomFilter.value) === ad.offer.rooms;
}

function filtrateByHousingGuests(ad) {
  const housingGuestFilter = filter.querySelector('#housing-guests');
  return housingGuestFilter.value === FilterValue.ALL || Number(housingGuestFilter.value) === ad.offer.guests;
}

function filtrateByHousingFeatures(ad) {
  const housingFeaturesFilters = Array.from(filter.querySelectorAll('.map__checkbox:checked'));

  return housingFeaturesFilters.every((filterItem) => {
    return ad.offer.features.includes(filterItem.value);
  });
}

function getFilteredAds(ads) {
  let filteredAds = [];
  for (let i=0; i < ads.length; i++) {

    if (
      filtrateByHousingType(ads[i]) && filtrateByHousingPrice(ads[i]) &&
      filtrateByHousingRooms(ads[i]) && filtrateByHousingGuests(ads[i]) &&
      filtrateByHousingFeatures(ads[i])
    ) {
      filteredAds.push(ads[i]);
      if (filteredAds.length >= MAX_ADS_COUNT) {
        break;
      }
    }
  }
  return filteredAds
}

export{
  activateFilter,
  resetFilter,
  getFilteredAds,
  onFilterChange,
  dispatchFilterEvent
}
