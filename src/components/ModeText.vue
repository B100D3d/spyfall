<template lang="pug">
    span {{ text }}
</template>

<script>
import { timeout } from "@/utils"

export default {
    name: "ModeText",
    data: () => ({
        text: "Зашифровать",
        modes: ["Расшифровать", "Зашифровать"],
    }),
    computed: {
        encrypt: (vm) => vm.$store.getters.encrypt,
    },
    methods: {
        async changeText() {
            const { text, modes, encrypt, deleteLastChar, addChar } = this

            let timeToChar = 250 / text.length
            for (const _ of text) {
                await timeout(timeToChar)
                deleteLastChar()
            }
            timeToChar = 250 / modes[+encrypt].length
            for (const char of modes[+encrypt]) {
                await timeout(timeToChar)
                addChar(char)
            }
        },
        deleteLastChar() {
            this.text = this.text.slice(0, this.text.length - 1)
        },
        addChar(char) {
            this.text += char
        },
    },
    watch: {
        encrypt() {
            this.changeText()
        },
    },
}
</script>

<style lang="sass" scoped>
span
    color: var(--color)
    transition: color .5s linear
</style>
