<template lang="pug">
    button(@click="handleClick" :disabled="loading")
        ModeText
</template>

<script>
import ModeText from "@/components/ModeText"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "SubmitButton",
    components: { ModeText },
    computed: {
        ...mapGetters(["key", "sourceSelected", "secretSelected", "encrypt"]),
        loading: {
            get: (vm) => vm.$store.getters.loading,
            set(isLoading) {
                this.$store.dispatch("setLoading", isLoading)
            },
        },
        result: {
            get: (vm) => vm.$store.getters.result,
            set(result) {
                this.$store.dispatch("setResult", result)
            },
        },
    },
    methods: {
        ...mapActions(["submit"]),
        getSource: () => document.querySelector("#Source img"),
        getSecret: () => document.querySelector("#Secret img"),
        getMessage: () => document.querySelector("#message"),
        async handleClick() {
            const isValid = this.check()
            if (isValid) {
                this.resetResult = null
                this.loading = true

                const query = this.getQuery()
                this.submit({ query, onError: this.onError })
            }
        },
        getQuery() {
            const source = this.getSource().src
            const message = this.getMessage()?.toDataURL("image/png")
            const secret = this.getSecret()?.src
            const key = this.key
            return this.encrypt
                ? { source, message, key }
                : { source, secret, key }
        },
        onError(e) {
            console.log(e)
            this.$toast.error("Ошибка")
        },
        check() {
            const { encrypt } = this
            const decrypt = !encrypt

            const source = this.getSource()
            const secret = this.getSecret()

            const { sourceSelected, secretSelected } = this

            const errors = []

            if (!this.sourceSelected) {
                errors.push("Выберите исходное изображение")
            }

            if (decrypt && !this.secretSelected) {
                errors.push("Выберите секретное изображение")
            }

            if (
                sourceSelected &&
                secretSelected &&
                !(
                    source.naturalWidth === secret.naturalWidth &&
                    source.naturalHeight === secret.naturalHeight
                )
            ) {
                errors.push("Изображения должны иметь одинаковый размер")
            }

            if (
                (sourceSelected || secretSelected) &&
                (source.naturalWidth < 380 ||
                    source.naturalHeight < 380 ||
                    secret?.naturalWidth < 380 ||
                    secret?.naturalHeight < 380)
            ) {
                errors.push("Минимальный размер изображения 380x380 px")
            }

            if (errors.length) {
                errors.forEach((e) => this.$toast.error(e))
                return false
            }

            return true
        },
    },
}
</script>

<style lang="sass" scoped>
button
    width: 100%
    min-height: 35px
    font-size: 1.4em
    margin: 40px 0 20px
    color: black
    background: linear-gradient(45deg, var(--temp-primary), var(--temp-secondary))
    border: none
    border-radius: 10px
    cursor: pointer
    transition: all .3s ease-in-out, --temp-primary .5s linear, --temp-secondary .5s linear

    span
        color: black

    &:hover
        transform: scale(1.1)
        box-shadow: 1px 2px 10px var(--color-primary)
        --temp-primary: var(--color-secondary)
        --temp-secondary: var(--color-primary)


@media (max-width: 650px)
    button
        &:hover
            transform: scale(1.05)

@media (max-width: 455px)
    button
        width: 90%
        margin: 40px auto
</style>
