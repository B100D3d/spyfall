import Vue from "vue"
import Vuex from "vuex"
import Toast from "@/components/Toast"
import App from "@/App.vue"

import state from "@/store"
import mutations from "@/store/mutations"
import { registerCSSColorProperties } from "@/utils/css"


Vue.use(Vuex)
Vue.use(Toast)

Vue.config.productionTip = false

registerCSSColorProperties()

const store = new Vuex.Store({
  state,
  mutations
})

new Vue({
  render: h => h(App),
  store
}).$mount("#app")
