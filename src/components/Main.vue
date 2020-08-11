<template lang="pug">
    main
        ImageSelector(_id="Source" class="ImageBlock" title="Исходное изображение")
        transition(name="fade" mode="out-in")
            Paint(v-if="encrypt" class="ImageBlock" title="Сообщение")
            ImageSelector(_id="Secret" class="ImageBlock" title="Секретное изображение" v-else)
        KeyInput
        SubmitButton
        Solution
</template>

<script>
import ImageSelector from "@/components/ImageSelector"
import SubmitButton from "@/components/SubmitButton"
import KeyInput from "@/components/KeyInput"
import Paint from "@/components/Paint"
import Solution from "@/components/Solution"

import { mapGetters } from "vuex"

export default {
    name: "Main",
    components: {
        Paint,
        ImageSelector,
        SubmitButton,
        KeyInput,
        Solution,
    },
    computed: mapGetters(["encrypt"]),
}
</script>

<style lang="sass" scoped>
main
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-content: flex-start
    width: 80%
    padding: 10px 20px 20px


@media (max-width: 1010px)
    main
        align-items: stretch
        flex-direction: column

@media (max-width: 650px)
    main
        width: 100%

@media (max-width: 455px)
    main
        padding: 10px 0
</style>
