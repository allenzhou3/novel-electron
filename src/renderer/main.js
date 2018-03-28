import Vue from 'vue'
import axios from 'axios'

import App from './App'
import {router} from './router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import VueLazyload from 'vue-lazyload'

axios.defaults.method = "GET";
Vue.use(VueLazyload);
Vue.use(Vant);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    template: '<App/>'
}).$mount('#app')
