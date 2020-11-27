<template>
  <f7-page name="catalog">
    <f7-navbar title="Уведомления (не работают)"></f7-navbar>
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
  </f7-page>
</template>
<script>
  import moment from 'moment';
  export default {
    name: 'catalog-view',
    data: function () {
      const db = this.$root.db;

      return{
        db,
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
        console.log('catalog.vue init');
      },
      enableDisable: function(newN, string){

        const self = this;
        const app = self.$f7;
        const $ = self.$$;

        const dataObj = this.$store.getters['getClientData'];
        const clong = parseInt(dataObj.clong);
        const dlong = parseInt(dataObj.dlong);
        const dlast = dataObj.dlast;

        let day = moment().format("YYYY-MM-DD");
        let fDay = moment().add(1, 'days').format("YYYY-MM-DD");

        let redDaysStart = moment(dlast).format("YYYY-MM-DD");

        let redDaysEnd = moment(redDaysStart).add(dlong-1, 'days').format("YYYY-MM-DD");

        let remaining = moment(redDaysStart, "YYYY-MM-DD").diff(moment(day, "YYYY-MM-DD"), 'days');

        if(Math.sign(parseInt(remaining)) == -1){
          console.log(parseInt(remaining));
        }

        let ovulationDay = moment(redDaysStart).add(Math.ceil((clong/2)), 'days').format("D MMMM");

        const now = new Date().getTime();
        const _15_sec_from_now = new Date(now + 15*1000);

        switch(string){
          case 'start':
            if(newN == true){

              const settings = {
                id: 1,
                title: 'Привет!',
                text: 'Сегодня начало менструации.',
                icon: 'file://static/icons/256x256.png',
                smallIcon: 'res://mipmap-xhdpi/ic_launcher.png',
                vibrate: true,
                led: 'FF0000',
                foreground: true,
                at: _15_sec_from_now
              };

              cordova.plugins.notification.local.schedule(settings, function(){
                console.log('уведомление установлено');
              }, function(){
                console.log('ошибка');
              });
            }else{
              cordova.plugins.notification.local.cancel([1,2], function() {
                console.log('уведомление снято');
              });
            }

          break;
        }
      },
    },
    watch: {
      notifStart: function(newN, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiaryNotify SET notifstart = (?) WHERE notifstart = (?)', [Number(newN), Number(oldN)], function(){
          self.enableDisable(newN, 'start');
        });
      },
      notifEnd: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifend = (?) WHERE notifend = (?)', [Number(newN), Number(oldN)], function(){
          // this.enableDisable(newN, 'end');
        });
      },
      notifOvul: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifovul = (?) WHERE notifovul = (?)', [Number(newN), Number(oldN)], function(){
          // this.enableDisable(newN, 'ovul');
        });
      },
      notifContr: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifcontr = (?) WHERE notifcontr = (?)', [Number(newN), Number(oldN)], function(){
          // this.enableDisable(newN, 'contr');
        });
      },
    }
  };
</script>
