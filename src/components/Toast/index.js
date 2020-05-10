import Toast from "./Toast"
import Api from "./api";


const Plugin = Vue => {
    Vue.prototype.$toast = Api(Vue)
}

Toast.install = Plugin

export default Toast