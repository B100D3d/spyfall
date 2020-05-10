<template lang="pug">
    button(@click="handleClick")
        ModeText
</template>

<script>
    import ModeText from "@/components/ModeText"
    import Encryption from "@/utils/encryption.ts"

    export default {
        name: "SubmitButton",
        components: { ModeText },
        data: () => ({
            encryption: null
        }),
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
        mounted() {
            this.encryption = new Encryption()
            this.encryption.onComplete = result => {
                this.loading = 0
                this.result = result
            }
        },
        methods: {
            getSource: () => document.querySelector("#Source img"),
            getSecret: () => document.querySelector("#Secret img"),
            getMessage: () => document.querySelector("#message"),
            async handleClick() {
                this.disableBtn()
                try {
                    fetch("/api/encrypt", {
                        method: "POST",
                        body: {
                            query: "Hello!"
                        }
                    })
                    .then(res => res.json())
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                    if(this.check()) {
                        this.resetResult()
                        await this.showLoading()
                        this.$store.state.encrypt ? this.encrypt() : this.decrypt()
                    }
                } catch (e) {
                    this.loading = 0
                    this.$toast.error(e)
                }
                this.enableBtn()
            },
            encrypt() {
                this.encryption.encrypt(this.getSource(), this.getMessage(), this.key)
            },
            decrypt() {
                this.encryption.decrypt(this.getSource(), this.getSecret(), this.key)
            },
            disableBtn() {
                this.$el.disabled = true
            },
            enableBtn() {
                this.$el.disabled = false
            },
            async showLoading() {
                this.loading = true
                await new Promise(r => setTimeout(r, 100))
            },
            resetResult(){
                this.result = null
            },
            check() {
                const en = this.$store.state.encrypt

                if(!this.sourceSelected || (!en && !this.secretSelected)) {
                    const toastText = `Выберите изоражени${en ? "е" : "я"}`
                    this.$toast.error(toastText)
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

                return true
            }

        }
    }
</script>

<style lang="sass" scoped>
    button
        width: 100%
        min-height: 35px
        font-size: 1.5em
        margin-top: 40px
        color: black
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary))
        border: none
        border-radius: 10px
        cursor: pointer
        transition: all .3s ease-in-out

        span
            color: black

        &:hover
            transform: scale(1.1)
            box-shadow: 1px 2px 10px var(--color-primary)



</style>