<template lang="pug">
    main
        ImageSelector(key="source")
        transition(name="fade" mode="out-in")
            Paint(v-if="encrypt")
            ImageSelector(key="secret" v-else)
        KeyInput
        SubmitButton
</template>

<script>
    import ImageSelector from "@/components/ImageSelector"
    import SubmitButton from "@/components/SubmitButton"
    import KeyInput from "@/components/KeyInput"
    import Paint from "@/components/Paint"

    export default {
        name: "Main",
        components: {
            Paint,
            ImageSelector,
            SubmitButton,
            KeyInput
        },
        computed: {
            encrypt: vm => vm.$store.state.encrypt
        }
    }
</script>

<style lang="sass" scoped>
    main
        position: relative
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        align-content: flex-start
        width: 80%
        padding: 20px

    .fade-enter, .fade-leave-to
        opacity: 0

    .fade-leave, .fade-enter-to
        opacity: 1

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s ease-in-out

</style>