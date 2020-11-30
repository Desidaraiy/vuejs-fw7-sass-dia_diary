<template>
  <f7-page name="settings">
    <f7-navbar title="Ещё"></f7-navbar>

    <f7-block inset strong class="no-margin clientset">
      <h2>{{dataObject.name}}</h2>
      <p><a href="/myacc/">Мой аккаунт</a>&nbsp;<f7-icon ios="f7:gear" md="material:settings"></f7-icon></p>
    </f7-block>

    <f7-list class="no-margin">
      <f7-list-item title="Темная тема"><f7-toggle :checked="darkTheme" @change="darkTheme = $event.target.checked"></f7-toggle></f7-list-item>
      <!-- <f7-list-item title="Режим беременности"><f7-toggle></f7-toggle></f7-list-item> -->
      <!-- <f7-list-item title="Статистика цикла / Графики" link="#"></f7-list-item> -->
      <f7-list-item title="Полезная информация" link="/about/"></f7-list-item>
      <f7-list-item title="Настройки уведомлений" link="/notifica/"></f7-list-item>
      <!-- <f7-list-item title="Оценить приложение" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Поделиться" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Связь с разработчиком" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Выйти из аккаунта" link=""></f7-list-item> -->
    </f7-list>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';
  export default{
    name: 'settingsview',
    data: function(){
      const dataObject = this.$store.getters['getClientData'];
      const settingsObject = this.$store.getters['getSettingsData'];
      const db = this.$root.db;
      return{
        db,
        dataObject,
        settingsObject,
      }
    },
    mounted: function(){
      setTimeout(this.init, 500);
    },
    computed: {
      darkTheme: {
        get: function(){
          return this.darkTheme = this.$store.getters['getDarkTheme'];
        },
        set: function(newValue){
          this.$store.commit('setDarkTheme', newValue);
        }
      }
    },
    methods: {
      init: function(){
        const self = this;
        this.settingsObject = this.$store.getters['getSettingsData'];
      },
      enableDisable: function(sup){
        const self = this;
        const app = self.$f7;
        const $ = self.$$;
        this.$store.commit('setDarkTheme', sup);
      }
    },
    watch: {
      darkTheme: function(sup, oldN){
        const self = this;
        this.db.executeSql('UPDATE DiarySettings SET darktheme = (?) WHERE darktheme = (?)', [Number(sup), Number(oldN)], function(){
          self.enableDisable(sup);
        });
      }
    }

  };
</script>