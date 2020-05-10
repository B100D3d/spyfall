<template lang="pug">
    img(id="solution" v-show="result" :src="result")
</template>

<script>
    import Loading from "@/components/Loading"

    export default {
        name: "Solution",
        components: { Loading },
        computed: {
            result: vm => vm.$store.state.result
        },
        methods: {
            scrollIntoView() {
                document.querySelector("#solution").scrollIntoView({ behavior: "smooth" })
            }
        },
        watch: {
            async result() {
                if(this.result) {
                    await new Promise(r => setTimeout(r, 100))
                    this.scrollIntoView()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

        #solution
            max-width: 50%
            margin: 0 auto
            margin-top: 40px

</style>