<template lang="pug">
    div(v-show="loading" class="loadingWrapper")
        Lottie(:options="opts" @animCreated="handleAnimation")
</template>

<script>
import Lottie from "vue-lottie"
import * as animationData from "@/assets/loading.json"

export default {
    name: "Loading",
    components: { Lottie },
    data: () => ({
        opts: {
            animationData: animationData.default,
            loop: true,
            autoplay: false,
        },
        anim: null,
    }),
    computed: {
        loading: (vm) => vm.$store.state.loading,
    },
    methods: {
        handleAnimation(anim) {
            this.anim = anim
        },
    },
    watch: {
        loading() {
            this.loading ? this.anim.play() : this.anim.stop()
        },
    },
}
</script>

<style lang="sass" scoped>

.loadingWrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    background-color: rgba(0, 0, 0, 0.5)
</style>
