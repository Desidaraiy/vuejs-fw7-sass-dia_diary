<template>
	<f7-page name="notifications">
		<f7-navbar back-link="Назад" title="Настройка уведомлений"></f7-navbar>
		<f7-block-title>Начало менструации</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				:value="id1_title"
				@input="id1_title = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
				:value="id1_text"
				@input="id1_text = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
				:value="id1_time"
				@input="id1_time = $event.target.value"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round @click="id1_save">Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>Конец менструации</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				:value="id2_title"
				@input="id2_title = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
				:value="id2_text"
				@input="id2_text = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
				:value="id2_time"
				@input="id2_time = $event.target.value"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round @click="id2_save">Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>День овуляции</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				:value="id3_title"
				@input="id3_title = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
				:value="id3_text"
				@input="id3_text = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
				:value="id3_time"
				@input="id3_time = $event.target.value"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round @click="id3_save">Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>Контрацепция (ежедневно)</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				:value="id4_title"
				@input="id4_title = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
				:value="id4_text"
				@input="id4_text = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
				:value="id4_time"
				@input="id4_time = $event.target.value"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round @click="id4_save">Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>

	</f7-page>
</template>
<script>
	
	import moment from 'moment';
	import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';

	export default {

		name: 'notificationsview',
		data: function(){
			const db = this.$root.db;

			var id1_title = '';
			var id1_text = '';
			var id1_time = '';

			var id2_title = '';
			var id2_text = '';
			var id2_time = '';

			var id3_title = '';
			var id3_text = '';
			var id3_time = '';

			var id4_title = '';
			var id4_text = '';
			var id4_time = '';

			return{
				db,
				id1_title,
				id1_text,
				id1_time,

				id2_title,
				id2_text,
				id2_time,

				id3_title,
				id3_text,
				id3_time,

				id4_title,
				id4_text,
				id4_time,
			}
		},
		mounted: function(){
			this.init();
		},
		methods: {
			init: function(){
		        const self = this;
		        const app = self.$f7;
		        const $ = self.$$;

		        this.db.executeSql('SELECT * FROM DNStrings WHERE id = (?)', [1], function(result){
    	          for (var i = 0; i < result.rows.length; i++) {
		            var row = result.rows.item(i);
		          }
		          self.id1_title = row.title;
		          self.id1_text = row.content;
		          self.id1_time = row.time;
		        });

		        this.db.executeSql('SELECT * FROM DNStrings WHERE id = (?)', [2], function(result){
    	          for (var i = 0; i < result.rows.length; i++) {
		            var row = result.rows.item(i);
		          }
		          self.id2_title = row.title;
		          self.id2_text = row.content;
		          self.id2_time = row.time;
		        });

		        this.db.executeSql('SELECT * FROM DNStrings WHERE id = (?)', [3], function(result){
    	          for (var i = 0; i < result.rows.length; i++) {
		            var row = result.rows.item(i);
		          }
		          self.id3_title = row.title;
		          self.id3_text = row.content;
		          self.id3_time = row.time;
		        });

		        this.db.executeSql('SELECT * FROM DNStrings WHERE id = (?)', [4], function(result){
    	          for (var i = 0; i < result.rows.length; i++) {
		            var row = result.rows.item(i);
		          }
		          self.id4_title = row.title;
		          self.id4_text = row.content;
		          self.id4_time = row.time;
		        });
			},
			id1_save: function(){
				const self = this;
				cordova.plugins.notification.local.get(1, function (notification) {
				    let day = moment(notification.trigger.at).format("YYYY-MM-DD");
					let timeArr = self.id1_time.split(':');
					if(timeArr[0].startsWith('0')){
						timeArr[0] = timeArr[0].slice(1);
					}
					if(timeArr[1].startsWith('0')){
						timeArr[1] = timeArr[1].slice(1);
					}
					var newTime = moment(day).add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
					self.db.executeSql('UPDATE DNStrings SET (title, content, time) = (?,?,?) WHERE id = (?)', [self.id1_title, self.id1_text, self.id1_time, 1]);
					console.log('id1 sql updated');
					cordova.plugins.notification.local.update({
						id: 1,
						title: self.id1_title,
      					text: self.id1_text,
      					at: newTime
					});
					console.log('id1 notification updated');
				});	
				cordova.plugins.notification.local.get(1, function (notification) {
					console.log(notification);
				});			
			},
			id2_save: function(){
				const self = this;
				cordova.plugins.notification.local.get(2, function (notification) {
				    let day = moment(notification.trigger.at).format("YYYY-MM-DD");
					let timeArr = self.id2_time.split(':');
					if(timeArr[0].startsWith('0')){
						timeArr[0] = timeArr[0].slice(1);
					}
					if(timeArr[1].startsWith('0')){
						timeArr[1] = timeArr[1].slice(1);
					}
					var newTime = moment(day).add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
					self.db.executeSql('UPDATE DNStrings SET (title, content, time) = (?,?,?) WHERE id = (?)', [self.id2_title, self.id2_text, self.id2_time, 2]);
					console.log('id2 sql updated');
					cordova.plugins.notification.local.update({
						id: 2,
						title: self.id2_title,
      					text: self.id2_text,
      					at: newTime
					});
					console.log('id2 notification updated');
				});
				cordova.plugins.notification.local.get(2, function (notification) {
					console.log(notification);
				});		
			},
			id3_save: function(){
				const self = this;
				cordova.plugins.notification.local.get(3, function (notification) {
				    let day = moment(notification.trigger.at).format("YYYY-MM-DD");
					let timeArr = self.id3_time.split(':');
					if(timeArr[0].startsWith('0')){
						timeArr[0] = timeArr[0].slice(1);
					}
					if(timeArr[1].startsWith('0')){
						timeArr[1] = timeArr[1].slice(1);
					}
					var newTime = moment(day).add(timeArr[0], 'hours').add(timeArr[1], 'minutes').toDate();
					self.db.executeSql('UPDATE DNStrings SET (title, content, time) = (?,?,?) WHERE id = (?)', [self.id3_title, self.id3_text, self.id3_time, 3]);
					console.log('id3 sql updated');
					cordova.plugins.notification.local.update({
						id: 3,
						title: self.id3_title,
      					text: self.id3_text,
      					at: newTime
					});
					console.log('id3 notification updated');
				});
				cordova.plugins.notification.local.get(3, function (notification) {
					console.log(notification);
				});	
			},
			id4_save: function(){
				const self = this;
				let timeArr = self.id4_time.split(':');
				if(timeArr[0].startsWith('0')){
					timeArr[0] = timeArr[0].slice(1);
				}
				if(timeArr[1].startsWith('0')){
					timeArr[1] = timeArr[1].slice(1);
				}
				self.db.executeSql('UPDATE DNStrings SET (title, content, time) = (?,?,?) WHERE id = (?)', [self.id4_title, self.id4_text, self.id4_time, 4]);
				console.log('id4 sql updated');
				var hour = parseInt(timeArr[0]);
                var minute = parseInt(timeArr[1]);
                var time = { every: { hour: hour, minute: minute } }

				cordova.plugins.notification.local.update({
					id: 4,
					title: self.id4_title,
  					text: self.id4_text,
  					trigger: time
				});
				console.log('id4 notification updated');

			}

		},


	};

</script>