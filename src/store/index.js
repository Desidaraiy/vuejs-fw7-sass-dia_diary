import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	clientData: {
    },
    settingsData: {

    },
    darkTheme: false,
    notifStart: false,
    notifEnd: false,
    notifOvul: false,
    notifContr: false,

  },
  getters: {
  	getClientData: state => {
  		return state.clientData;
  	},
    // notifications
    getNotifStart: state => {
      return state.notifStart;
    },
    getNotifEnd: state => {
      return state.notifEnd;
    },
    getNotifOvul: state => {
      return state.notifOvul;
    },
    getNotifContr: state => {
      return state.notifContr;
    },
    // !notifications
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
  	},
    // notifications
    setNotifStart: (state, payload) => {
      state.notifStart = payload;
    },
    setNotifEnd: (state, payload) => {
      state.notifEnd = payload;
    },
    setNotifOvul: (state, payload) => {
      state.notifOvul = payload;
    },
    setNotifContr: (state, payload) => {
      state.notifContr = payload;
    },
    // !notifications
    setSettingsData: (state, payload) => {
      state.settingsData = payload;
    },
    setDarkTheme: (state, payload) => {
      state.darkTheme = payload;
    }
  },
})