import { take, call, put, select } from 'redux-saga/effects';

import {request} from './helpers/helper.request.js';
import {defaultRequestSettings} from './helpers/helper.default.request.settings.js';
import {createSagas, createActions} from './helpers/helper.saga.js';

import {moreNews, startLoadMoreNews, endLoadMoreNews,
				getNews, startLoadGetNews, endLoadGetNews,
        newNews, startLoadNewNews, endLoadNewNews, errorNewNews,
        removeNews, startLoadRemoveNews, endLoadRemoveNews, errorRemoveNews} from "../news.js";

function* getNewsSaga({payload = {}}) {
	yield put(startLoadGetNews());
	const res = yield call(request, {
		method: 'get',
		url: `https://jsonplaceholder.typicode.com/posts`,
		params: new URLSearchParams(payload.params.toString()+'&_sort=id&_order=desc'),// {_sort: 'id', _order: 'desc', ...payload.params},
		...defaultRequestSettings
	});
	yield put(getNews(res.data));
	yield put(endLoadGetNews());
}

function* moreNewsSaga({payload = {}}) {
	yield put(startLoadMoreNews());
	const res = yield call(request, {
		method: 'get',
		url: `https://jsonplaceholder.typicode.com/posts`,
		params: new URLSearchParams(payload.params.toString()+'&_sort=id&_order=desc'),//{_sort: 'id', _order: 'desc', ...payload.params},
		...defaultRequestSettings
	});
	yield put(moreNews(res.data));
	yield put(endLoadMoreNews());
}

function* newNewsSaga({payload = {}}) {
	try {
		yield put(startLoadNewNews());
		const res = yield call(request, {
			method: 'post',
			url: `https://jsonplaceholder.typicode.com/posts`,
			data: {title: payload.title, body: payload.body, userId: 1},
			...defaultRequestSettings
		});
		yield put(newNews(res.data));
	} catch(e) {
    delete e.config;
		yield put(errorNewNews(e));
	} finally {
		yield put(endLoadNewNews());
	}
}

function* removeNewsSaga({payload = {}}) {
	try {
		yield put(startLoadRemoveNews({id: payload.id}));
		const res = yield call(request, {
			method: 'delete',
			url: `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
			//data: {id: payload.id},
			...defaultRequestSettings
		});
		yield put(removeNews({...res.data, id: payload.id}));
	} catch(e) {
		delete e.config
		yield put(errorRemoveNews(e));
	} finally {
		yield put(endLoadRemoveNews({id: payload.id}));
	}
}

const FETCH_MORE_NEWS = 'FETCH_MORE_NEWS';
const FETCH_GET_NEWS = 'FETCH_GET_NEWS';
const FETCH_NEW_NEWS = 'FETCH_NEW_NEWS';
const FETCH_REMOVE_NEWS = 'FETCH_REMOVE_NEWS';

export const newsSagas = createSagas([
	[FETCH_MORE_NEWS, moreNewsSaga],
	[FETCH_GET_NEWS, getNewsSaga],
  [FETCH_NEW_NEWS, newNewsSaga],
  [FETCH_REMOVE_NEWS, removeNewsSaga],
]);

export const {sagaMoreNews, sagaGetNews, sagaNewNews, sagaRemoveNews} = createActions({
	sagaMoreNews: FETCH_MORE_NEWS,
	sagaGetNews: FETCH_GET_NEWS,
  sagaNewNews: FETCH_NEW_NEWS,
  sagaRemoveNews: FETCH_REMOVE_NEWS,
});
