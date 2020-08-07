import Vue from "vue"
import Toast from "@/components/Toast"
import App from "@/App.vue"
import store from "@/store"

import { registerCSSColorProperties } from "@/utils/css"

Vue.use(Toast)

Vue.config.productionTip = false

registerCSSColorProperties()

new Vue({
    render: (h) => h(App),
    store,
}).$mount("#app")
