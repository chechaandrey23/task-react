import { take, call, put, select, delay } from 'redux-saga/effects';

import {request} from './helpers/helper.request.js';
import {defaultRequestSettings} from './helpers/helper.default.request.settings.js';
import {createSagas, createActions} from './helpers/helper.saga.js';

import {locale} from "../locale.js";

function* getLocaleSaga({payload = {}}) {
  yield put(locale(JSON.parse(localStorage.getItem('locale')) || 'en'));
}

function* setLocaleSaga({payload = {}}) {
  localStorage.setItem('locale', JSON.stringify(payload));
  yield put(locale(JSON.parse(localStorage.getItem('locale'))));
}

const GET_LOCALE = 'GET_LOCALE';
const SET_LOCALE = 'SET_LOCALE';

export const localeSagas = createSagas([
	[GET_LOCALE, getLocaleSaga],
  [SET_LOCALE, setLocaleSaga],
]);

export const {sagaGetLocale, sagaSetLocale} = createActions({
	sagaGetLocale: GET_LOCALE,
  sagaSetLocale: SET_LOCALE,
});
