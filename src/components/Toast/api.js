import Toast from "./Toast"

const Api = (Vue) => ({
    open(options) {
        let propsData = {}
        if (typeof options === "string") propsData.message = options
        else propsData = { ...options }

        return new (Vue.extend(Toast))({
            el: document.createElement("div"),
            propsData,
        })
    },
    error(message, options) {
        this.open({ ...options, message, type: "error" })
    },
})

export default Api
