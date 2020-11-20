<template>
  <div class="block block-strong no-padding no-margin no-hairline-top">
    <div id="calendarius"></div>
    <div id="calendar-events" class="list no-margin no-hairlines no-ios-left-edge">
      <ul></ul>
    </div>
  </div>

</template>
<script>
  import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';
  import moment from 'moment';

  export default {
    name: 'calendarer',
    components: {
      f7Navbar,
      f7Page,
      f7NavTitle,
    },
    data: function() {
      const today = new Date();
      const dataObject = this.$store.getters['getClientData'];

      return {
        today,
        dataObject,
      }
    },
    mounted: function() {

      this.createCalendar();

    },
    methods: {

      createCalendar(){
        const self = this;
        const app = self.$f7;
        const $ = self.$$;
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'];

        const dlast = this.dataObject.dlast;
        const dlong = this.dataObject.dlong;
        const clong = this.dataObject.clong;
        const age = this.dataObject.age;

        const day = moment().format("YYYY-MM-DD");
        const prognoz = clong*7;
        const onecycle = clong;
        const ranges = [];

        for (let i = clong; i < prognoz; i = i + clong) {
          if(i == onecycle){
            var redDaysStart = moment(dlast).subtract(1,'days').format("YYYY-MM-DD");
          }else{
            var redDaysStart = moment(dlast).add(i-(onecycle+1), 'days').format("YYYY-MM-DD");
          }

          var redDaysEnd = moment(redDaysStart).add(dlong, 'days').format("YYYY-MM-DD");

          var ovulationDay = moment(redDaysStart).add(Math.ceil(onecycle/2), 'days').format("YYYY-MM-DD");

          var highDanderStart = moment(ovulationDay).subtract(2, 'days').format("YYYY-MM-DD");
          var highDanderEnd = moment(ovulationDay).add(1, 'days').format("YYYY-MM-DD");

          var middleDangerOneStart = moment(highDanderStart).subtract(4, 'days').format("YYYY-MM-DD");
          var middleDangerOneEnd = moment(highDanderStart).format("YYYY-MM-DD");

          var middleDangerTwoStart = moment(highDanderEnd).add(12, 'hours').format("YYYY-MM-DD");
          var middleDangerTwoEnd = moment(highDanderEnd).add(2, 'days').format("YYYY-MM-DD");

          var a = {
            cssClass: 'middle-danger', 
            range: {
              from: middleDangerOneStart,
              to: middleDangerOneEnd
            }
          };
          var b = {
            cssClass: 'middle-danger', 
            range: {
              from: middleDangerTwoStart,
              to: middleDangerTwoEnd
            }
          };
          var c = {
            cssClass: 'high-danger',
            range: {
              from: highDanderStart,
              to: highDanderEnd
            }
          };
          var d = {
            cssClass: 'red-days',
            range: {
              from: redDaysStart,
              to: redDaysEnd
            }
          };
          ranges.push(a,b,c,d);
        }

        for (let i = prognoz; i >= 0; i = i - clong) {
          if(i == onecycle){

          }else{
            var redDaysStart = moment(dlast).subtract(i-(onecycle-1), 'days').format("YYYY-MM-DD");
          }
          var redDaysEnd = moment(redDaysStart).add(dlong, 'days').format("YYYY-MM-DD");
          var ovulationDay = moment(redDaysStart).add(Math.ceil(onecycle/2), 'days').format("YYYY-MM-DD");
          var highDanderStart = moment(ovulationDay).subtract(2, 'days').format("YYYY-MM-DD");
          var highDanderEnd = moment(ovulationDay).add(1, 'days').format("YYYY-MM-DD");
          var middleDangerOneStart = moment(highDanderStart).subtract(4, 'days').format("YYYY-MM-DD");
          var middleDangerOneEnd = moment(highDanderStart).format("YYYY-MM-DD");
          var middleDangerTwoStart = moment(highDanderEnd).add(12, 'hours').format("YYYY-MM-DD");
          var middleDangerTwoEnd = moment(highDanderEnd).add(2, 'days').format("YYYY-MM-DD");
          var a = {
            cssClass: 'middle-danger', 
            range: {
              from: middleDangerOneStart,
              to: middleDangerOneEnd
            }
          };
          var b = {
            cssClass: 'middle-danger', 
            range: {
              from: middleDangerTwoStart,
              to: middleDangerTwoEnd
            }
          };
          var c = {
            cssClass: 'high-danger',
            range: {
              from: highDanderStart,
              to: highDanderEnd
            }
          };
          var d = {
            cssClass: 'red-days',
            range: {
              from: redDaysStart,
              to: redDaysEnd
            }
          };
          ranges.push(a,b,c,d);
        }
        self.calendar = app.calendar.create({
          containerEl: '#calendarius',
          rangesClasses: ranges,
          toolbar: true,
          value: [self.today],
          on: {
            init(calendar) {
              $('.navbar-calendar-title').text(`${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`);
              calendar.$el.addClass('no-ios-right-edge');
            },
            monthYearChangeStart(calendar) {
              $('.navbar-calendar-title').text(`${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`);
            },
            change(calendar) {

              if($('div.calendar-day-selected').hasClass('red-days')){
                self.$el.querySelector('.list ul').innerHTML = '<li class="item-content"><div class="item-inner"><div class="item-title text-color-gray">Менструация</div></div></li>';
              }else if($('div.calendar-day-selected').hasClass('middle-danger')){
                self.$el.querySelector('.list ul').innerHTML = '<li class="item-content"><div class="item-inner"><div class="item-title text-color-gray">Средняя вероятность беременности</div></div></li>';
              }else if($('div.calendar-day-selected').hasClass('high-danger')){
                self.$el.querySelector('.list ul').innerHTML = '<li class="item-content"><div class="item-inner"><div class="item-title text-color-gray">Высокая вероятность беременности</div></div></li>';
              }else{
                self.$el.querySelector('.list ul').innerHTML = '<li class="item-content"><div class="item-inner"><div class="item-title text-color-gray">Низкая вероятность беременности</div></div></li>';
              }

            },
          },
        });

      }
    },
  };
</script>