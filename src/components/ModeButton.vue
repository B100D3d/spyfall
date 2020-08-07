<template lang="pug">
    button(@click="changeMod" :disabled="disabled")
        ModeText
</template>

<script>
import ModeText from "@/components/ModeText"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "ModeButton",
    components: { ModeText },
    data: () => ({ disabled: false }),
    computed: mapGetters(["encrypt"]),
    methods: mapActions(["changeMod"]),
    watch: {
        async encrypt() {
            this.disabled = true
            await new Promise((r) => setTimeout(r, 500))
            this.disabled = false
        },
    },
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
    font-size: 1.3em

    &:hover
        font-size: 1.4em
        margin: 0

html[data-theme = "dark"] button:hover span
    color: var(--color-accent)
    text-shadow: 2px 1px 15px var(--color-accent)
</style>
