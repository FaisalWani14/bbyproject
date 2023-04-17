import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import router from './router'
import { createPinia } from "pinia";
const pinia = createPinia()

// Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/scss/main.scss';

// global.jQuery = require('jquery');
// var $ = global.jQuery;
// window.$ = $;


Vue.config.productionTip = false;

const app = Vue.createApp(App)

app.use(BootstrapVue)
app.use(IconsPlugin)
app.use(pinia)
app.use(router).mount('#app')

