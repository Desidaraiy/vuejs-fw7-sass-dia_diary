import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	
  	clientData: {
    },
  	// settings
  	// notifications
  },
  getters: {
  	getClientData: state => {
  		return state.clientData;
  	},
	// getsettings
  	// getnotifications
  },
  mutations: {
  	setClientData: (state, {payload}) => {
  		state.clientData = payload;
      return state.clientData;
  	},
  },
})