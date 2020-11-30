<template>
  <f7-page name="catalog">
    <f7-navbar title="Уведомления"></f7-navbar>
    <f7-block strong inset class="no-margin">
      <f7-block-title>Цикл</f7-block-title>
      <f7-list simple-list>
        <f7-list-item>
          <span>Начало месячных</span>
          <f7-toggle :checked="notifStart" @change="notifStart = $event.target.checked"></f7-toggle>
        </f7-list-item>
        <f7-list-item>
          <span>Окончание месячных</span>
          <f7-toggle :checked="notifEnd" @change="notifEnd = $event.target.checked"></f7-toggle>
        </f7-list-item>
        <f7-list-item>
          <span>Овуляция</span>
          <f7-toggle :checked="notifOvul" @change="notifOvul = $event.target.checked"></f7-toggle>
        </f7-list-item>
      </f7-list>
      <f7-list>
        <f7-block-title>Контрацепция</f7-block-title>
        <f7-list-item>
          <span>Приём контрацепции</span>
          <f7-toggle :checked="notifContr" @change="notifContr = $event.target.checked"></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-block>
<!--     <f7-block strong inset>
      <f7-button fill round large link="/notifica/">Настройки</f7-button>      
    </f7-block> -->
  </f7-page>
</template>
<script>
  import moment from 'moment';
  export default {
    name: 'catalog-view',
    data: function () {
      const db = this.$root.db;
      return{
        db
      }
    },
    computed: {
      notifStart: {
        get: function(){
          return this.notifStart = this.$store.getters['getNotifStart'];
        },
        set: function(newValue){
          this.$store.commit('setNotifStart', newValue);
        }
      },
      notifEnd: {
        get: function(){
          return this.notifEnd = this.$store.getters['getNotifEnd'];
        },
        set: function(newValue){
          this.$store.commit('setNotifEnd', newValue);
        }
      },
      notifOvul: {
        get: function(){
          return this.notifOvul = this.$store.getters['getNotifOvul'];
        },
        set: function(newValue){
          this.$store.commit('setNotifOvul', newValue);
        }
      },
      notifContr: {
        get: function(){
          return this.notifContr = this.$store.getters['getNotifContr'];
        },
        set: function(newValue){
          this.$store.commit('setNotifContr', newValue);
        }
      },
    },
    mounted: function(){
      this.init();
    },
    methods: {
      init: function(){
        cordova.plugins.notification.local.isTriggered(3, function (pres) {
          if(pres){
            this.updateOlds();
          }
        });
      },
      updateOlds: function(){
        this.enableDisable(false, 'start', 1);
        this.enableDisable(false, 'end', 2);
        this.enableDisable(false, 'ovul', 3);
        this.enableDisable(true, 'start', 1);
        this.enableDisable(true, 'end', 2);
        this.enableDisable(true, 'ovul', 3);
      },
      enableDisable: function(newN, string, id){
        const self = this;
        const app = self.$f7;
        const $ = self.$$;
        const dataObj = this.$store.getters['getClientData'];
        const clong = parseInt(dataObj.clong);
        const dlong = parseInt(dataObj.dlong);
        const dlast = dataObj.dlast;
        this.db.executeSql('SELECT * FROM DNStrings WHERE id = (?)', [id], function(result){
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
          }
          var settObj = {
            id: id,
            title: row.title,
            content: row.content,
            time: row.time
          };
          let day = moment().format("YYYY-MM-DD");
          let fDay = moment().add(1, 'days').format("YYYY-MM-DD");
          let redDaysStart = moment(dlast).format("YYYY-MM-DD");
          let redDaysEnd = moment(redDaysStart).add(dlong-1, 'days').format("YYYY-MM-DD");
          let remaining = moment(redDaysStart, "YYYY-MM-DD").diff(moment(day, "YYYY-MM-DD"), 'days');
          // работа со времененем
          var timeArr = settObj.time.split(':');
          if(timeArr[0].startsWith('0')){
            timeArr[0] = timeArr[0].slice(1);
          }
          if(timeArr[1].startsWith('0')){
            timeArr[1] = timeArr[1].slice(1);
          }
          if(Math.sign(parseInt(remaining)) == -1){
            remaining = parseInt(remaining)+clong;
            var remainingEnd = moment(day).add(remaining, 'days').add(dlong, 'days').add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
            remaining = moment(day).add(remaining, 'days').add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
          }
          let ovulationDay = moment(redDaysStart).add(Math.ceil((clong/2)), 'days');
          ovulationDay = moment(ovulationDay).add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
          if(newN == true){
            switch(string){
              case 'contr':
                var hour = parseInt(timeArr[0]);
                var minute = parseInt(timeArr[1]);
                var time = { every: { hour: hour, minute: minute } }
                var settings = {
                  trigger: time
                };
              break;
              case 'start':
                var time = remaining;
                var settings = {
                  at: time
                };
              break;
              case 'ender':
                var time = remainingEnd;
                var settings = {
                  at: time
                };
              break;
              case 'ovul':
                var time = ovulationDay;
                var settings = {
                  at: time
                };
              break;
            }
            let notificationObj = {
              id: id,
              title: settObj.title,
              text: settObj.content,
              icon: 'file://static/icons/256x256.png',
              smallIcon: 'res://mipmap-xhdpi/ic_launcher.png',
              vibrate: true,
              led: 'FF0000',
              foreground: true,              
            }
            Object.assign(notificationObj, settings);
            cordova.plugins.notification.local.schedule(notificationObj, function(result){
              console.log('уведомление '+string+':'+id+' установлено на ', JSON.stringify(time));
            });
          }else{
            cordova.plugins.notification.local.cancel([id], function() {
              console.log('уведомление '+string+':'+id+' снято');
            });
          }
        });
      },
    },
    watch: {
      notifStart: function(newN, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiaryNotify SET notifstart = (?) WHERE notifstart = (?)', [Number(newN), Number(oldN)], function(){
          self.enableDisable(newN, 'start', 1);
        });
      },
      notifEnd: function(newN, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiaryNotify SET notifend = (?) WHERE notifend = (?)', [Number(newN), Number(oldN)], function(){
          self.enableDisable(newN, 'ender', 2);
        });
      },
      notifOvul: function(newN, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiaryNotify SET notifovul = (?) WHERE notifovul = (?)', [Number(newN), Number(oldN)], function(){
          self.enableDisable(newN, 'ovul', 3);
        });
      },
      notifContr: function(newN, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiaryNotify SET notifcontr = (?) WHERE notifcontr = (?)', [Number(newN), Number(oldN)], function(){
          self.enableDisable(newN, 'contr', 4);
        });
      },
    }
  };
</script>
