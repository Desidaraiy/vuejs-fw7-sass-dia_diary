<template>
  <f7-page name="home" class="no-margin">

    <f7-fab-backdrop slot="fixed"></f7-fab-backdrop>
    <f7-fab position="right-bottom" slot="fixed">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
      <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="Добавить симптомы">1</f7-fab-button>
        <f7-fab-button label="Редактировать цикл">2</f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

    <f7-block v-if="clientExists" strong class="no-padding no-margin no-hairline-top">
      <calendarer />
    </f7-block>

    <span v-else>календаря пока нет</span>

    <f7-block strong inset class="row no-margin" v-if="clientExists">
      <div class="col-70">
        <span v-if="daysExists" class="no-margin">Осталось <span class="pink">{{daysRemaining}} дней</span></span>
        <span v-else>Критические дни прошли</span>
        <br>
        <span class="pink">{{nextMenst}}</span> След. Менструация
        <br>
        <span class="pink">{{nextOvulation}}</span> След. Овуляция
      </div>
      <div class="col-30"></div>
    </f7-block>

    <f7-block v-else strong inset class="row no-margin">
      <div class="col-70">
        <span class="no-margin">Ваша регистрация не найдена.</span>
      </div>
    </f7-block>

<!--     <f7-block strong inset class="row no-margin">
      <div class="col-10"></div>
      <f7-button large round fill class="col-80">Начались!</f7-button>
      <div class="col-10"></div>
    </f7-block>
 -->
    <f7-login-screen class="demo-login-screen" :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
      <f7-page login-screen>
        <f7-login-screen-title>Календарь Dia</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            label="Имя"
            type="text"
            placeholder="Ваше имя"
            :value="name"
            @input="name = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Длительность цикла"
            type="number"
            placeholder="в днях"
            :value="clong"
            @input="clong = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Длительность кд"
            type="number"
            placeholder="в днях"
            :value="dlong"
            @input="dlong = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Дата начала последних кд"
            type="date"
            placeholder="Дата"
            :value="dlast"
            @input="dlast = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Возраст"
            type="number"
            placeholder="Полных лет"
            :value="age"
            @input="age = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button @click="signIn">Зарегистрироваться</f7-list-button>
        </f7-list>
      </f7-page>
    </f7-login-screen>

  </f7-page>
</template>
<script>
  import { f7, f7ready } from 'framework7-vue';
  import Calendarer from '@/components/calendar.vue';
  import moment from 'moment';

  export default {
    name: 'homeview',
    components : {
      Calendarer
    },
    data(){
      const db = this.$root.db;
      const daysRemaining = 0;
      const nextMenst = 0;
      const nextOvulation = 0;
      const daysExists = false;
      const clientExists = false;

      const dataObject = this.$store.getters['getClientData'];

      return{
        db,
        dataObject,
        daysRemaining,
        nextMenst,
        nextOvulation,
        daysExists,
        clientExists,
        loginScreenOpened: false,
        name: '',
        clong: '',
        dlong: '',
        dlast: '',
        age: ''
      }
    },
    mounted() {
      this.initialize();
    }, 
    methods: {
      signIn(){
        const self = this;
        const app = self.$f7;
        const $ = self.$$;
        this.db.executeSql('INSERT INTO DiaryTable (clong, dlong, dlast, name, age) VALUES (?,?,?,?,?)', [this.clong, this.dlong, this.dlast, this.name, this.age], function(){
          console.log('регистрация прошла успешно');
        });
        this.db.executeSql('SELECT * FROM DiaryTable WHERE id = (?)', [1], function(result){
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
          } 

          let dataObj = {
            clong: row.clong,
            dlong: row.dlong,
            dlast: row.dlast,
            age: row.age,
            name: row.name
          };

          self.$store.state.clientData = dataObj;
          self.dataObject = self.$store.getters['getClientData'];
          console.log(self.dataObject, '123');
          self.initialize();

        });  
      },

      initialize(){

        const self = this;
        console.log(self.dataObject, 'инициализация');

        if(Object.keys(this.dataObject).length == 0){
          this.loginScreenOpened = true;
        }else{
          this.loginScreenOpened = false;
          this.clientExists = true;
          this.computeDays();
        }

      },

      computeDays(){
        moment.locale('ru');
        const self = this;
        const app = self.$f7;
        const $ = self.$$;

        // посчитаем, сколько дней осталось до конца месячных, и остались ли они вообще

        let dlast = this.dataObject.dlast;
        let dlong = this.dataObject.dlong;
        let clong = this.dataObject.clong;
        let age = this.dataObject.age;

        let day = moment().format("YYYY-MM-DD");

        let redDaysStart = moment(dlast).subtract(1,'days').format("YYYY-MM-DD");
        let redDaysEnd = moment(redDaysStart).add(dlong, 'days').format("YYYY-MM-DD");

        let remaining = moment(redDaysEnd, "YYYY-MM-DD").diff(moment(day, "YYYY-MM-DD"), 'days');

        remaining++;

        if(remaining > 0){
          this.daysExists = true;
          this.daysRemaining = remaining;
        }

        // выводим даты следующей овуляции и менструации

        let ovulationDay = moment(redDaysStart).add(Math.ceil((clong/2)+1), 'days').format("D MMM");

        this.nextOvulation = ovulationDay;

        let menstrDay = moment(redDaysStart).add((clong+1), 'days').format("D MMM");

        this.nextMenst = menstrDay;

      }
    },
  };

</script>