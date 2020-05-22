<template lang="pug">
    div(class="ImageSelectorWrapper" :id="_id")
        InputTypeSwitch(@change="setInputMode")
        FileInput(v-if="isLoad" @change="setImgUrl" :_id="_id")
        UrlInput(@change="setImgUrl" v-else)
        transition(name="fade")
            img(v-show="isSelected")
</template>

<script>
    import InputTypeSwitch from "@/components/InputTypeSwitch"
    import UrlInput from "@/components/UrlInput"
    import FileInput from "@/components/FileInput"

    export default {
        name: "ImageSelector",
        components: {
            InputTypeSwitch,
            UrlInput,
            FileInput
        },
        props: { _id: String },
        data: () => ({
            inputMode: "Load",
            src: ""
        }),
        methods: {
            setInputMode(mode) {
                this.inputMode = mode
            },
            setImgUrl(img) {
                this.src = img
            }
        },
        computed: {
            isLoad: vm => vm.inputMode === "Load",
            isSelected: vm => !!vm.src
        },
        watch: {
            inputMode() {
                this.setImgUrl("")
            },
            src() {
                this.$el.querySelector("img").src = this.src
                this.$store.commit(`set${this._id}Selected`, this.isSelected)
            }
        }
    }
</script>

<style lang="sass" scoped>

    .ImageSelectorWrapper
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: center
        padding: 10px
        flex-basis: 45%
        min-height: 200px

        img
            max-width: 100%
            max-height: 300px
            margin-top: 40px

    @media (max-width: 930px)
        .ImageSelectorWrapper
            flex-basis: 80%
            margin: 10px 0

    @media (max-width: 650px)
        .ImageSelectorWrapper
            flex-basis: 90%

</style>