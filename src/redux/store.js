import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import profileReduser from './profile.js';
import newsReduser from './news.js';
import authReduser from './auth.js';
import localeReduser from './locale.js';

import saga from "./saga/saga.js";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		profile: profileReduser,
		news: newsReduser,
		auth: authReduser,
		locale: localeReduser,
	},
	middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;
