<template>
	<f7-page name="notifications">
		<f7-navbar back-link="Назад" title="настройка уведомлений"></f7-navbar>
		<f7-block-title>Начало менструации</f7-block-title>
		<f7-block strong class="no-margin">
			привет
		</f7-block>
		<f7-block-title>Конец менструации</f7-block-title>
		<f7-block strong class="no-margin">
			привет
		</f7-block>
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
		        app.dialog.alert('init');
			}
		},


	};

</script>