import {createSlice} from '@reduxjs/toolkit'

import Paginator from './helpers/Paginator.js'

export const storeNews = createSlice({
	name: 'news',
	initialState: {
		paginator: new Paginator(10),

		data: [],
		dataLoading: false,
		dataMoreLoading: false,

    newData: null,
    dataNewLoading: false,
    errorNewData: false,

    dataProcessing: [],
	},
	reducers: {
		moreNews(state, action) {
			state.paginator.addWithReplace(state, 'data', action.payload, (curEl, newEl) => curEl.id == newEl.id);
		},
		startLoadMoreNews(state, action) {
			state.dataMoreLoading = true;
		},
		endLoadMoreNews(state, action) {
			state.dataMoreLoading = false;
		},

		getNews(state, action) {
			state.paginator.replace(state, 'data', action.payload);
		},
		startLoadGetNews(state, action) {
			state.dataLoading = true;
		},
		endLoadGetNews(state, action) {
			state.dataLoading = false;
		},

    newNews(state, action) {
      state.newData = action.payload;
      state.paginator.append(state, 'data', [action.payload]);
    },
    startLoadNewNews(state, action) {
      state.dataNewLoading = true;
    },
    endLoadNewNews(state, action) {
      state.dataNewLoading = false;
    },
    errorNewNews(state, action) {
      state.errorNewData = action.payload;
    },

    removeNews(state, action) {
			state.paginator.remove(state, 'data', (entry) => entry.id == action.payload.id);
		},
    startLoadRemoveNews(state, action) {
			state.dataProcessing = [...state.dataProcessing, action.payload];
		},
    endLoadRemoveNews(state, action) {
			state.dataProcessing = [...state.dataProcessing].filter((entry) => entry.id != action.payload.id);
		},
    errorRemoveNews(state, action) {
			console.error(action.payload);
		},
	}
});

export const {moreNews, startLoadMoreNews, endLoadMoreNews,
				      getNews, startLoadGetNews, endLoadGetNews,
              newNews, startLoadNewNews, endLoadNewNews, errorNewNews,
              removeNews, startLoadRemoveNews, endLoadRemoveNews, errorRemoveNews} = storeNews.actions;

export default storeNews.reducer;
