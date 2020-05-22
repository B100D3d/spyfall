<template lang="pug">
    input(v-model="url" type="url" placeholder="Ссылка")
</template>

<script>
    export default {
        name: "UrlInput",
        data: () => ({
            url: "",
            img: null
        }),
        watch: {
            url() {
                this.$el.checkValidity() && this.$emit("change", this.url)
            }
        }
    }
</script>

<style lang="sass" scoped>
    input
        width: 100%
        margin-top: 40px
        border: none
        color: var(--color)
        font-size: 1.2em
        transition: all .2s linear
        padding: 5px
        background-color: transparent
        border-bottom: 2px solid gray

        &:focus
            border-color: var(--color-accent)

        &:invalid
            border-color: red
</style>