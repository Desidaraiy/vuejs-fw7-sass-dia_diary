// Import Vue
import Vue from 'vue';

import Vuex from 'vuex';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';
// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';
import '../css/style.sass';
// Import App Component
import App from '../components/app.vue';
import cordovaApp from '../js/cordova-app.js';
import moment from 'moment';

import store from '../store/index.js';
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

var dataObj = {};

// var settingsObj = {};

var darkTheme = 0;

var notifStart = 0;
var notifEnd = 0;
var notifOvul = 0;
var notifContr = 0;

var db = null;
// Init App
const openDbStart = () =>{

  if(window.sqlitePlugin){

    db = window.sqlitePlugin.openDatabase({
      name: 'diadiary.db',
      location: 'default'
    });

    cordova.plugins.notification.local.hasPermission(function (granted) {
      if(granted == false){
        cordova.plugins.notification.local.requestPermission(function (granted) { 
          console.log('готово');
        });
      }else{
        console.log('не требуется');
      }
    });

    db.executeSql('CREATE TABLE IF NOT EXISTS DiaryTable (id integer primary key, clong integer, dlong integer, dlast text, age integer, name text, email text, pincode text)');

    db.executeSql('CREATE TABLE IF NOT EXISTS DiaryNotify (id integer primary key, notifstart integer, notifend integer, notifovul integer, notifcontr integer)');

    db.executeSql('CREATE TABLE IF NOT EXISTS DiarySettings (id integer primary key, darktheme integer)');

    db.executeSql('SELECT count(*) AS notifcount FROM DiaryNotify WHERE id = (?)', [1], function(result){
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(row.notifcount > 0){

          db.executeSql('SELECT * FROM DiaryNotify WHERE id = (?)', [1], function(result){
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
            }
            notifStart = row.notifstart;
            notifEnd = row.notifend;
            notifOvul = row.notifovul;
            notifContr = row.notifcontr;
            store.state.notifStart = !!notifStart;
            store.state.notifEnd = !!notifEnd;
            store.state.notifOvul = !!notifOvul;
            store.state.notifContr = !!notifContr;

          });

        }else{
          db.executeSql('INSERT INTO DiaryNotify (notifstart, notifend, notifovul, notifcontr) VALUES (?,?,?,?)', [0,0,0,0], function(){
            console.log('notifications table ok');
          });        
        }
        store.state.notifStart = !!notifStart;
        store.state.notifEnd = !!notifEnd;
        store.state.notifOvul = !!notifOvul;
        store.state.notifContr = !!notifContr;
    });

    db.executeSql('SELECT count(*) AS settcount FROM DiarySettings WHERE id = (?)', [1], function(result){
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(row.settcount > 0){

          db.executeSql('SELECT * FROM DiarySettings WHERE id = (?)', [1], function(result){
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
            }
            darkTheme = row.darktheme;
            store.state.darkTheme = !!darkTheme;
          });

        }else{
          db.executeSql('INSERT INTO DiarySettings (darktheme) VALUES (?)', [0], function(){
            console.log('settings table ok');
          });

          darkTheme = 0;
          store.state.darkTheme = !!darkTheme;
        }
        
    });

    db.executeSql('SELECT count(*) AS clientCount FROM DiaryTable WHERE id = (?)', [1], function(result){
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(row.clientCount > 0){
          db.executeSql('SELECT * FROM DiaryTable WHERE id = (?)', [1], function(result){
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
            }

            dataObj = {
              clong: row.clong,
              dlong: row.dlong,
              dlast: row.dlast,
              age: row.age,
              name: row.name,
            };

            init(dataObj);
          });   
        }else{

          init(dataObj);

        }
    });

  }else{

    console.log('с плагином не срослось');

    dataObj = {
      clong: 34,
      dlong: 4,
      dlast: '2020-11-15',
      age: 19,
      name: 'Вика'
    };

    darkTheme = 1;

    store.state.darkTheme = !!darkTheme;

    init(dataObj);
 
  } 

}

const init = (dataObj) => {
  new Vue({
    el: '#app',

    render: (h) => h(App),
    store,
    components: {
      app: App
    },
    data:{
      db: db,
      // darkTheme,
    },
    mounted(){
      this.$store.state.clientData = dataObj;
      // this.$store.state.settingsData = settingsObj;
    }
  });

};

document.addEventListener("deviceready", () => {
  console.log("Ready, Render the App");
  openDbStart();
});

const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}