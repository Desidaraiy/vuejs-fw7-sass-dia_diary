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

var db = null;
// Init App
const openDbStart = () =>{

  if(window.sqlitePlugin){

    db = window.sqlitePlugin.openDatabase({
      name: 'diadiary.db',
      location: 'default'
    });
    
    db.executeSql('CREATE TABLE IF NOT EXISTS DiaryTable (id integer primary key, clong integer, dlong integer, dlast text, age integer, name text, email text, pincode text)');

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

    // dataObj = {
    //   clong: 29,
    //   dlong: 4,
    //   dlast: '2020-11-15',
    //   age: 22,
    //   name: 'Vikus'
    // };

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
      db: db
    },
    mounted(){

      console.log(dataObj);

      // this.$store.commit('setClientData', dataObj);

      this.$store.state.clientData = dataObj;

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