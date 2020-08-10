import Toast from "./Toast"
import { timeout } from "@/utils"

const Api = (Vue) => {
    let opening = false
    const changeOpening = () => (opening = !opening)
    return {
        async open(options) {
            while (opening) {
                await timeout(500)
            }
            let propsData = {}
            if (typeof options === "string") propsData.message = options
            else propsData = { ...options }

            changeOpening()
            timeout(500).then(changeOpening)
            return new (Vue.extend(Toast))({
                el: document.createElement("div"),
                propsData,
            })
        },
        async error(message, options) {
            this.open({ ...options, message, type: "error" })
        },
    }
}

export default Api
