import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	
  	clientData: {
    },
    notifData: {
    },
    settingsData: {

    },
    darkTheme: false,

  },
  getters: {
  	getClientData: state => {
  		return state.clientData;
  	},
    getNotifData: state => {
      return state.notifData;
    },
    getSettingsData: state => {
      return state.settingsData;
    },
    getDarkTheme: state => {
      return state.darkTheme;
    }
	// getsettings
  },
  mutations: {
  	setClientData: (state, payload) => {
  		state.clientData = payload;
      // return state.clientData;
  	},
    setNotifData: (state, payload) => {
      state.notifData = payload;
    },
    setSettingsData: (state, payload) => {
      state.settingsData = payload;
    },
    setDarkTheme: (state, payload) => {
      state.darkTheme = payload;
    }
  },
})