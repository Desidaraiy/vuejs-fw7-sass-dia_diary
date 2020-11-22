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
  </f7-page>
</template>
<script>
  export default {
    name: 'catalog-view',
    data: function () {
      const db = this.$root.db;

      const notifObject = this.$store.getters['getNotifData'];
      return{
        db,
        notifObject,
        notifStart: false,
        notifEnd: false,
        notifOvul: false,
        notifContr: false,
      }
    },
    mounted: function(){
      this.init();
    },
    methods: {
      init: function(){

        console.log(this.notifObject, 'нотифобжект');

        console.log(this.notifStart, Boolean(this.notifObject.notifStart), '123');
        console.log(this.notifStart, this.notifObject.notifStart, '321');

        if(this.notifStart != Boolean(this.notifObject.notifStart)){
          this.notifStart = Boolean(this.notifObject.notifStart);
          console.log('1');
        }
        if(this.notifEnd != Boolean(this.notifObject.notifEnd)){
          this.notifEnd = Boolean(this.notifObject.notifEnd);
          console.log('2');
        }
        if(this.notifOvul != Boolean(this.notifObject.notifOvul)){
          this.notifOvul = Boolean(this.notifObject.notifOvul);
          console.log('3');
        }
        if(this.notifContr != Boolean(this.notifObject.notifContr)){
          this.notifContr = Boolean(this.notifObject.notifContr);
          console.log('4');
        }

      },

    },
    watch: {
      // notifStart: function(newN, oldN){
      //   this.db.executeSql('UPDATE DiaryNotify SET notifstart = (?) WHERE notifstart = (?)', [String(newN), String(oldN)], function(){
      //     console.log('обновлено');
      //     console.log(String(newN), String(oldN));
      //   });
      // },
      // notifEnd: function(newN, oldN){
      //   this.db.executeSql('UPDATE DiaryNotify SET notifend = (?) WHERE notifend = (?)', [String(newN), String(oldN)]);
      // },
      // notifOvul: function(newN, oldN){
      //   this.db.executeSql('UPDATE DiaryNotify SET notifovul = (?) WHERE notifovul = (?)', [String(newN), String(oldN)]);
      // },
      // notifContr: function(newN, oldN){
      //   this.db.executeSql('UPDATE DiaryNotify SET notifcontr = (?) WHERE notifcontr = (?)', [String(newN), String(oldN)]);
      // },
    }
  };
</script>
