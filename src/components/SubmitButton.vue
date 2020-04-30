<template lang="pug">
    button
        ModeText
</template>

<script>
    import ModeText from "@/components/ModeText"

    export default {
        name: "SubmitButton",
        components: { ModeText }
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

        &:hover
            transform: scale(1.1)
            box-shadow: 1px 2px 10px var(--color-primary)


</style>