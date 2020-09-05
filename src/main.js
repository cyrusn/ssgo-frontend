import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHourglass,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faHeart,
  faPrint,
  faListAlt,
  faTrophy,
  faSitemap
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

sync(store, router)

library.add(
  faHourglass,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faHeart,
  faPrint,
  faListAlt,
  faTrophy,
  faSitemap
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
