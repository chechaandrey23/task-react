import {createSlice} from '@reduxjs/toolkit'

//import Paginator from './helpers/Paginator.js'

export const storeLocale = createSlice({
	name: 'locale',
	initialState: {
    locale: 'en'
	},
	reducers: {
    locale(state, action) {
      state.locale = action.payload;
    },
	}
});

export const {locale} = storeLocale.actions;

export default storeLocale.reducer;
