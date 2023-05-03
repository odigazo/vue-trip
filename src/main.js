import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VModal from 'vue-js-modal';

Vue.use(VModal, { dynamic: true })

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.prototype._baseUrl = "http://localhost:8080/trip/"
axios.defaults.withCredentials=true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
