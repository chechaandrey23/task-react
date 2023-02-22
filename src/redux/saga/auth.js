import { take, call, put, select, delay } from 'redux-saga/effects';

import {request} from './helpers/helper.request.js';
import {defaultRequestSettings} from './helpers/helper.default.request.settings.js';
import {createSagas, createActions} from './helpers/helper.saga.js';

import {login, startLoadLogin, endLoadLogin, errorLogin,
        logout, startLoadLogout, endLoadLogout, errorLogout,
        auth} from "../auth.js";

function* loginSaga({payload = {}}) {
	try {
		yield put(startLoadLogin());
    yield delay(1500);
    if(payload.username == 'admin' && payload.password == '12345') {
      localStorage.setItem('auth-default', JSON.stringify(true));
      yield put(login(true));
      yield put(logout(false));
    } else {
      yield put(errorLogin({data: {message: 'You entered the incorrect username and/or password! Please re-enter your username and password!'}}));
    }
	} catch(e) {
		yield put(errorLogin(e));
	} finally {
		yield put(endLoadLogin());
	}
}

function* logoutSaga({payload = {}}) {
	yield put(startLoadLogout());
  yield delay(1500);
  localStorage.setItem('auth-default', JSON.stringify(false));
	yield put(logout(true));
  yield put(login(false));
	yield put(endLoadLogout());
}

function* authSaga({payload = {}}) {
  yield put(auth(!!JSON.parse(localStorage.getItem('auth-default'))));
}

const FETCH_LOGIN = 'FETCH_LOGIN';
const FETCH_LOGOUT = 'FETCH_LOGOUT';
const FETCH_AUTH = 'FETCH_AUTH';

export const authSagas = createSagas([
	[FETCH_LOGIN, loginSaga],
  [FETCH_LOGOUT, logoutSaga],
  [FETCH_AUTH, authSaga],
]);

export const {sagaLogin, sagaLogout, sagaAuth} = createActions({
	sagaLogin: FETCH_LOGIN,
  sagaLogout: FETCH_LOGOUT,
  sagaAuth: FETCH_AUTH,
});
