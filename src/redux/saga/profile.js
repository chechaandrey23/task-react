import { take, call, put, select } from 'redux-saga/effects';

import {request} from './helpers/helper.request.js';
import {defaultRequestSettings} from './helpers/helper.default.request.settings.js';
import {createSagas, createActions} from './helpers/helper.saga.js';

import {profile, startLoadProfile, endLoadProfile} from "../profile.js";

function* profileSaga() {
	yield put(startLoadProfile());
	const res = yield call(request, {
		method: 'get',
		url: `https://jsonplaceholder.typicode.com/users/1`,
		...defaultRequestSettings
	});

	yield put(profile(res.data));
	yield put(endLoadProfile());
}

const FETCH_PROFILE = 'FETCH_PROFILE';

export const profileSagas = createSagas([
	[FETCH_PROFILE, profileSaga],
]);

export const {sagaProfile} = createActions({
	sagaProfile: FETCH_PROFILE
});
