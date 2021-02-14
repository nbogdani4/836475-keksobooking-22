import {createAd} from './create-ad.js'

const SIMILAR_AD_COUNT = 10;

new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
