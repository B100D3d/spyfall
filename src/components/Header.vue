<template lang="pug">
    header
        ModeButton
        ThemeButton

</template>

<script>
import ThemeButton from "@/components/ThemeButton"
import ModeButton from "@/components/ModeButton"

export default {
    name: "Header",
    components: {
        ThemeButton,
        ModeButton,
    },
}
</script>

<style lang="sass" scoped>
header
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    background-color: transparent
    padding: 5px 20px
</style>
