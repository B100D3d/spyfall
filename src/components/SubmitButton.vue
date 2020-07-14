<template lang="pug">
    button(@click="handleClick")
        ModeText
</template>

<script>
    import ModeText from "@/components/ModeText"

    export default {
        name: "SubmitButton",
        components: { ModeText },
        computed: {
            key: vm => vm.$store.state.key,
            sourceSelected: vm => vm.$store.state.sourceSelected,
            secretSelected: vm => vm.$store.state.secretSelected,
            loading: {
                get: vm => vm.$store.state.loading,
                set(isLoading) {
                    this.$store.commit("setLoading", isLoading)
                }
            },
            result: {
                get: vm => vm.$store.state.result,
                set(result) {
                    this.$store.commit("setResult", result)
                }
            }
        },
        methods: {
            getSource: () => document.querySelector("#Source img"),
            getSecret: () => document.querySelector("#Secret img"),
            getMessage: () => document.querySelector("#message"),
            async handleClick() {
                this.disableBtn()
                try {
                    if(this.check()) {
                        this.resetResult()
                        this.showLoading()
                        this.$store.state.encrypt ? this.encrypt() : this.decrypt()
                    }
                } catch (e) {
                    this.loading = false
                    this.$toast.error(e)
                }
                this.enableBtn()
            },
            onComplete(data) {
                this.loading = false
                this.result = data.result
            },
            onError(e) {
                this.loading = false
                console.log(e)
                this.$toast.error("Ошибка")
            },
            encrypt() {
                const source = this.getSource().src
                const message = this.getMessage().toDataURL("image/png")
                const key = this.key
                const query = {
                    source,
                    message,
                    key
                }
                fetch("https://devourer.ru/api/encrypt", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                })
                .then(res => res.json())
                .then(this.onComplete)
                .catch(this.onError)
            },
            decrypt() {
                const source = this.getSource().src
                const secret = this.getSecret().src
                const key = this.key
                const query = {
                    source,
                    secret,
                    key
                }
                fetch("https://devourer.ru/api/decrypt", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                })
                .then(res => res.json())
                .then(this.onComplete)
                .catch(this.onError)
            },
            disableBtn() {
                this.$el.disabled = true
            },
            enableBtn() {
                this.$el.disabled = false
            },
            showLoading() {
                this.loading = true
            },
            resetResult(){
                this.result = null
            },
            check() {
                const en = this.$store.state.encrypt

                if(!this.sourceSelected || (!en && !this.secretSelected)) {
                    this.$toast.error(`Выберите изоражени${en ? "е" : "я"}`)
                    return false
                }

                const source = this.getSource()
                const secret = this.getSecret()
                if(!en &&
                    !(source.naturalWidth === secret.naturalWidth
                    && source.naturalHeight === secret.naturalHeight)
                ) {
                    this.$toast.error("Изображения должны иметь одинаковый размер")
                    return false
                }

                if(source.naturalWidth < 380 || source.naturalHeight < 380
                    || secret?.naturalWidth < 380 || secret?.naturalHeight < 380) {
                    this.$toast.error("Минимальный размер изображения 380x380 px")
                    return false
                }

                return true
            }

        }
    }
</script>

<style lang="sass" scoped>
    button
        width: 100%
        min-height: 35px
        font-size: 1.4em
        margin-top: 40px
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


</style>