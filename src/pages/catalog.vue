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

      setTimeout(this.init, 500);
      // this.init();
    },
    methods: {
      init: function(){

        this.notifObject = this.$store.getters['getNotifData'];


        if(this.notifStart != !!this.notifObject.notifStart){
          this.notifStart = !!this.notifObject.notifStart;
        }
        if(this.notifEnd != !!this.notifObject.notifEnd){
          this.notifEnd = this.notifObject.notifEnd;
        }
        if(this.notifOvul != !!this.notifObject.notifOvul){
          this.notifOvul = this.notifObject.notifOvul;
        }
        if(this.notifContr != !!this.notifObject.notifContr){
          this.notifContr = this.notifObject.notifContr;
        }

      },

    },
    watch: {
      notifStart: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifstart = (?) WHERE notifstart = (?)', [Number(newN), Number(oldN)], function(){

        });
      },
      notifEnd: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifend = (?) WHERE notifend = (?)', [Number(newN), Number(oldN)], function(){

        });
      },
      notifOvul: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifovul = (?) WHERE notifovul = (?)', [Number(newN), Number(oldN)], function(){

        });
      },
      notifContr: function(newN, oldN){
        this.db.executeSql('UPDATE DiaryNotify SET notifcontr = (?) WHERE notifcontr = (?)', [Number(newN), Number(oldN)], function(){

        });
      },
    }
  };
</script>
