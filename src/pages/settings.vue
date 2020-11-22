<template>
  <f7-page name="settings">
    <f7-navbar title="Ещё"></f7-navbar>

    <f7-block inset strong class="no-margin clientset">
      <h2>{{dataObject.name}}</h2>
      <p><a href="/myacc/">Мой аккаунт</a>&nbsp;<f7-icon ios="f7:gear" md="material:settings"></f7-icon></p>
    </f7-block>

    <f7-list class="no-margin">
      <f7-list-item title="Статистика цикла / Графики" link="#"></f7-list-item>
      <f7-list-item title="Режим беременности"><f7-toggle></f7-toggle></f7-list-item>
      <f7-list-item title="Полезная информация" link="#"></f7-list-item>
      <!-- <f7-list-item title="Настройки" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Оценить приложение" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Поделиться" link="#"></f7-list-item> -->
      <!-- <f7-list-item title="Связь с разработчиком" link="#"></f7-list-item> -->
      <f7-list-item title="Выйти из аккаунта" link=""></f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';
  export default{
    name: 'settingsview',
    data: function(){
      const dataObject = this.$store.getters['getClientData'];
      return{
        dataObject
      }
    }
  };
</script>