<template lang="pug">
    input(placeholder="Ключ")
</template>

<script>
    export default {
        name: "KeyInput"
    }
</script>

<style lang="sass" scoped>
    input
        width: 100%
        border: none
        background-color: transparent
        color: var(--color)
        margin-top: 20px
        padding: 5px
        border-bottom: 2px solid gray
        text-align: center
        font-size: 1.5em
        transition: all .3s ease-in-out

        &:focus
            border-color: var(--color-accent)

    h1
</style>