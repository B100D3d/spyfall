<template lang="pug">
    span {{ text }}
</template>

<script>
    export default {
        name: "ModeText",
        data: () => ({
            text: "Зашифровать",
            modes: ["Расшифровать", "Зашифровать"]
        }),
        computed: {
            encrypt: vm => vm.$store.state.encrypt
        },
        methods: {
            async changeText() {
                const { text, modes, encrypt, deleteLastChar, addChar } = this
                // eslint-disable-next-line no-unused-vars
                for (const _ of text) {
                    await new Promise(r => setTimeout(r, 21.73))
                    deleteLastChar()
                }
                for (const char of modes[+encrypt]) {
                    await new Promise(r => setTimeout(r, 21.73))
                    addChar(char)
                }
            },
            deleteLastChar() {
                this.text = this.text.slice(0, this.text.length-1)
            },
            addChar(char) {
                this.text += char
            }
        },
        watch: {
            encrypt() {
                this.changeText()
            }
        }
    }
</script>

<style lang="sass" scoped>
    span
        color: var(--color)
        transition: color .5s linear
</style>