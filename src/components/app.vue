<template>
  <f7-app :params="f7params" :theme-dark="darkTheme">

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar bottom>
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-md="material:home" ></f7-link>
      <f7-link tab-link="#view-catalog" icon-ios="f7:speaker_2_fill" icon-md="material:volume_up"></f7-link>
      <f7-link tab-link="#view-settings" icon-ios="f7:line_horizontal_3" icon-md="material:view_headline" ></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>

    <!-- Catalog View -->
    <f7-view id="view-catalog" name="catalog" tab url="/catalog/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>

  </f7-views>

  </f7-app>
</template>

<script>

  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters

        f7params: {
          id: 'com.pushmobile.diaryvue', // App bundle ID
          name: 'Мой дневник', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            const a = 'stringer';
            return {
              a
            };
          },

          // App routes
          routes: routes,

          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },
        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {

    },
    mounted() {
      this.$f7ready((f7) => {
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });

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

  }

</script>

