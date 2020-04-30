import Vue from "vue"
import Vuex from "vuex"
import App from "./App.vue"

import state from "@/store"
import mutations from "@/store/mutations"

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state,
  mutations
})

new Vue({
  render: h => h(App),
  store
}).$mount("#app")
