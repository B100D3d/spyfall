<template lang="pug">
    div(class="key")
        input(placeholder="Ключ" id="key" v-model.lazy="key")
        button(class="generateBtn" @click="generateKey")
</template>

<script>
    import { range } from "@/utils"

    export default {
        name: "KeyInput",
        computed: {
            key: {
                get: vm => vm.$store.state.key,
                set(key) {
                    this.$store.commit("setKey", key)
                }
            }
        },
        methods: {
            async generateKey() {
                this.animate()
                const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-=+|'";:/?.>,<[{}]~\\`
                let key = ""
                range(380).forEach(() => key += chars[Math.floor(Math.random() * chars.length)])
                this.key = key
            },
            async animate() {
                document.querySelector(".generateBtn").classList.add("rotation")
                await new Promise(r => setTimeout(r, 500))
                document.querySelector(".generateBtn").classList.remove("rotation")
            }
        }
    }
</script>

<style lang="sass" scoped>
    .key
        position: relative
        width: 100%
        margin-top: 10px

        .generateBtn
            position: absolute
            top: calc(50% - 15px)
            right: 10px
            border: none
            background: url("../assets/generate.svg")
            width: 30px
            height: 30px
            cursor: pointer

            &.rotation
                animation: rotation .5s linear

        #key
            width: 100%
            border: none
            background-color: transparent
            color: var(--color)
            padding: 5px 50px
            border-bottom: 2px solid gray
            text-align: center
            font-size: 1.3em
            transition: all .3s ease-in-out

            &:focus
                border-color: var(--color-accent)


</style>