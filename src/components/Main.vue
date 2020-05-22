<template lang="pug">
    main
        ImageSelector(_id="Source")
        transition(name="fade" mode="out-in")
            Paint(v-if="encrypt")
            ImageSelector(_id="Secret" v-else)
        KeyInput
        SubmitButton
        Solution
        Loading
</template>

<script>
    import ImageSelector from "@/components/ImageSelector"
    import SubmitButton from "@/components/SubmitButton"
    import KeyInput from "@/components/KeyInput"
    import Paint from "@/components/Paint"
    import Solution from "@/components/Solution"
    import Loading from "@/components/Loading"

    export default {
        name: "Main",
        components: {
            Loading,
            Paint,
            ImageSelector,
            SubmitButton,
            KeyInput,
            Solution
        },
        computed: {
            encrypt: vm => vm.$store.state.encrypt
        }
    }
</script>

<style lang="sass" scoped>
    main
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        align-content: flex-start
        width: 80%
        padding: 20px


    @media (max-width: 930px)
        main
            justify-content: center

    @media (max-width: 650px)
        main
            width: 100%

</style>