<template>
	<f7-page name="notifications">
		<f7-navbar back-link="Назад" title="настройка уведомлений"></f7-navbar>
		<f7-block-title>Начало менструации</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				value=""
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round>Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>Конец менструации</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				value=""
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round>Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>День овуляции</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				value=""
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
			></f7-list-input>
			<br/>
			<f7-row>
				<f7-col></f7-col>
				<f7-col><f7-button fill round>Сохранить</f7-button></f7-col>
				<f7-col></f7-col>
			</f7-row>
		</f7-list>
		<f7-block-title>Контрацепция (ежедневно)</f7-block-title>
		<f7-list no-hairlines-md>
			<f7-list-input
				label="Заголовок"
				type="text"
				placeholder="Привет!"
				value=""
			></f7-list-input>
			<f7-list-input
				label="Текст"
				type="text"
				placeholder="Сообщение"
			></f7-list-input>
			<f7-list-input
				label="Во сколько?"
				type="text"
				placeholder="09:00"
			></f7-list-input>
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
	
	import moment from 'moment';
	import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue';

	export default {

		name: 'notificationsview',
		data: function(){
			const db = this.$root.db;
			return{
				db
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

			}
		},


	};

</script>