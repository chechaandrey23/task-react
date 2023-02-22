import {createSlice} from '@reduxjs/toolkit'

//import Paginator from './helpers/Paginator.js'

export const storeAuth = createSlice({
	name: 'auth',
	initialState: {
    login: false,
		loadLogin: false,
		errorLogin: false,
    logout: false,
		loadLogout: false,
		errorLogout: false,
    auth: false,
	},
	reducers: {
    login(state, action) {
			state.login = action.payload;
		},
		startLoadLogin(state, action) {
			state.loadLogin = true;
		},
		endLoadLogin(state, action) {
			state.loadLogin = false;
		},
		errorLogin(state, action) {
			state.errorLogin = action.payload;
		},
    logout(state, action) {
			state.logout = action.payload;
		},
		startLoadLogout(state, action) {
			state.loadLogout = true;
		},
		endLoadLogout(state, action) {
			state.loadLogout = false;
		},
		errorLogout(state, action) {
			state.errorLogout = action.payload;
		},
    auth(state, action) {
      state.auth = action.payload;
      if(action.payload) {
        state.login = true;
        state.logout = false;
      } else {
        state.login = false;
        state.logout = true;
      }
    },
	}
});

export const {login, startLoadLogin, endLoadLogin, errorLogin,
              logout, startLoadLogout, endLoadLogout, errorLogout,
              auth,} = storeAuth.actions;

export default storeAuth.reducer;
