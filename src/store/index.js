import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	
  	clientData: {
    },
    notifData: {
    }
  	// settings

  },
  getters: {
  	getClientData: state => {
  		return state.clientData;
  	},
    getNotifData: state => {
      return state.notifData;
    }
	// getsettings
  },
  mutations: {
  	setClientData: (state, payload) => {
  		state.clientData = payload;
      return state.clientData;
  	},
    setNotifData: (state, payload) => {
      state.notifData = payload;
    }
  },
})