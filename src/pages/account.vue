<template>
  <f7-page name="myacc">
    <f7-navbar back-link="Назад" title="Редактировать данные"></f7-navbar>

      <f7-list no-hairlines-md>
        <f7-list-input
          label="Имя"
          type="text"
          placeholder="Будет отображаться в настройках"
          clear-button>
        </f7-list-input>
        <f7-list-input
          label="E-mail"
          type="email"
          placeholder="Нужен для экспорта учетных данных"
          clear-button>
        </f7-list-input>
        <br/>
        <f7-row>
          <f7-col></f7-col>
          <f7-col><f7-button fill round>Сохранить</f7-button></f7-col>
          <f7-col></f7-col>
        </f7-row>
      </f7-list>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';
  export default{
    data: function(){
      const dataObject = this.$store.getters['getClientData'];
      return{
        dataObject
      }
    }
  };
</script>