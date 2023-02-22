import {createSlice} from '@reduxjs/toolkit'

//import Paginator from './helpers/Paginator.js'

export const storeProfile = createSlice({
	name: 'profile',
	initialState: {
		//paginator: new Paginator(10),

    data: {},
    dataLoading: false,
	},
	reducers: {
    profile(state, action) {
			state.data = {...action.payload};
		},
    startLoadProfile(state, action) {
      state.dataLoading = true;
    },
    endLoadProfile(state, action) {
      state.dataLoading = false;
    },
	}
});

export const {profile, startLoadProfile, endLoadProfile} = storeProfile.actions;

export default storeProfile.reducer;
