<template lang="pug">
    div(class="ImageSelectorWrapper" :id="_id")
        span(class="ImageBlock__title") {{ title }}
        InputTypeSwitch(@change="inputMode = $event")
        FileInput(v-if="isLoad" @change="src = $event" :_id="_id")
        UrlInput(@change="src = $event" v-else)
        transition(name="fade")
            img(v-show="isSelected")
</template>

<script>
import InputTypeSwitch from "@/components/InputTypeSwitch"
import UrlInput from "@/components/UrlInput"
import FileInput from "@/components/FileInput"
import { SelectedImage } from "@/types"

export default {
    name: "ImageSelector",
    components: {
        InputTypeSwitch,
        UrlInput,
        FileInput,
    },
    props: { _id: String, title: String },
    data: () => ({
        inputMode: "Load",
        src: "",
    }),
    computed: {
        isLoad: (vm) => vm.inputMode === "Load",
        isSelected: (vm) => Boolean(vm.src),
    },
    watch: {
        inputMode() {
            this.src = ""
        },
        src() {
            this.$el.querySelector("img").src = this.src
            const type =
                this._id === "Secret"
                    ? SelectedImage.Secret
                    : SelectedImage.Source
            this.$store.dispatch(`setImageSelected`, {
                type,
                selected: this.isSelected,
            })
        },
    },
}
</script>

<style lang="sass" scoped>

.ImageSelectorWrapper
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    flex-basis: 45%
    min-height: 200px

    img
        max-width: 100%
        max-height: 300px
        margin-top: 40px

@media (max-width: 1010px)
    .ImageSelectorWrapper
        flex-basis: 80%
        margin: 10px 0

@media (max-width: 650px)
    .ImageSelectorWrapper
        flex-basis: 90%
</style>
