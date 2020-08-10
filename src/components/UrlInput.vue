<template lang="pug">
    input(@input="emit" type="url" placeholder="Ссылка")
</template>

<script>
export default {
    name: "UrlInput",
    methods: {
        emit(event) {
            if (this.$el.checkValidity()) {
                this.$emit("change", event.target.value)
            }
        },
    },
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
