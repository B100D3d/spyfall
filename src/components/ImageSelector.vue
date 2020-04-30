<template lang="pug">
    div(class="ImageSelectorWrapper")
        InputTypeSwitch(@change="setInputMode")
        FileInput(v-if="isLoad" @change="handleImageChange" :key="$vnode.key")
        UrlInput(v-else @change="handleImageChange")
        img
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
        data: () => ({
            inputMode: "Load"
        }),
        methods: {
            setInputMode(mode) {
                this.inputMode = mode
            },
            handleImageChange(img) {
                this.setImgUrl(img)
            },
            setImgUrl(img) {
                this.$el.querySelector("img").src = img
            }
        },
        computed: {
            isLoad: vm => vm.inputMode === "Load"
        },
        watch: {
            inputMode() {
                this.setImgUrl("")
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

</style>