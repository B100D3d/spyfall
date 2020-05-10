<template lang="pug">
    button(@click="setMode")
        ModeText
</template>

<script>
    import ModeText from "@/components/ModeText"

    export default {
        name: "ModeButton",
        components: { ModeText },
        data() {
            return {
                encrypt: true
            }
        },
        methods: {
            setMode() {
                this.encrypt = !this.encrypt
            },
            disableBtn() {
                this.$el.disabled = true
            },
            enableBtn() {
                this.$el.disabled = false
            }
        },
        watch: {
            async encrypt() {
                this.$store.commit("changeMod")
                this.disableBtn()
                await new Promise(r => setTimeout(r, 500))
                this.enableBtn()
            }
        }
    }
</script>

<style lang="sass" scoped>
    button
        border: none
        background-color: transparent
        padding: 0
        transition: all .3s ease-in-out, color .5s linear, text-shadow .5s linear
        margin: 5px
        cursor: pointer
        font-size: 1.375em

        &:hover
            font-size: 1.5em
            margin: 0

    html[data-theme = "dark"] button:hover span
        color: var(--color-accent)
        text-shadow: 2px 1px 15px var(--color-accent)
</style>