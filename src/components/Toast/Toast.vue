<template lang="pug">
    transition(name="slideDown")
        div(class="toast" :class="[type]" v-show="isActive" @click="handleClick")
            span {{ message }}
</template>

<script>
import { removeElement } from "@/utils"

export default {
    name: "Toast",
    props: {
        message: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 3000,
        },
        type: {
            type: String,
        },
        onClick: {
            type: Function,
        },
    },
    data: () => ({
        isActive: false,
        parent: null,
        timer: null,
    }),
    beforeMount() {
        this.setupContainer()
    },
    mounted() {
        this.showToast()
    },
    methods: {
        setupContainer() {
            this.parent = document.querySelector(".toastWrapper")

            if (this.parent) return

            this.parent = document.createElement("div")
            this.parent.className = "toastWrapper"

            document.body.appendChild(this.parent)
        },
        showToast() {
            this.parent.insertAdjacentElement("beforeend", this.$el)
            this.isActive = true

            this.timer = setTimeout(this.close, this.duration)
        },
        close() {
            clearTimeout(this.timer)
            this.isActive = false

            setTimeout(() => {
                this.$destroy()
                removeElement(this.$el)
            }, 500)
        },
        handleClick() {
            if (this.onClick) this.onClick()
            else this.close()
        },
    },
}
</script>

<style lang="sass">

.toastWrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    display: flex
    flex-direction: column
    justify-content: start
    align-items: center
    z-index: 999
    pointer-events: none

    .toast
        display: flex
        justify-content: center
        align-items: center
        border-radius: 10px
        margin: 10px 0
        padding: 10px
        pointer-events: all
        box-shadow: 1px 6px 10px black

        &.error
            background-color: red

        span
            color: white
            font-size: 1.1em
</style>
