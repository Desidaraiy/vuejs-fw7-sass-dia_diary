<template>
  <f7-page name="myacc">
    <f7-navbar back-link="Назад" title="Редактировать данные"></f7-navbar>

    <f7-block strong inset class="no-margin">
      <f7-list class="no-hairlines-md no-margin">
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

      </f7-list>
    </f7-block>

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