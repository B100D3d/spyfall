<template lang="pug">
    div(id="app")
        Header
        Main
        Loading
</template>

<script>
import Header from "@/components/Header"
import Main from "@/components/Main"
import Loading from "@/components/Loading"

export default {
    name: "App",
    components: {
        Loading,
        Header,
        Main,
    },
}
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap")

@import "styles/animations"
@import "styles/variables"

*
    outline: none
    box-sizing: border-box
    -webkit-tap-highlight-color: transparent
    font-family: "Kosugi Maru", sans-serif
    transition: border-color .5s linear
    scrollbar-width: thin
    scrollbar-color: #29B6F630 transparent


    &::-webkit-scrollbar
        height: 5px
        width: 5px
        background-color: transparent

    &::-webkit-scrollbar-corner
        background-color: transparent

    &::-webkit-scrollbar-thumb
        transition: background-color .5s linear
        background-color: var(--color-accent)
        border-radius: 10px

html
    font-family: "Kosugi Maru", sans-serif
    font-size: 16px

body
    margin: 0
    background-color: var(--background-color)

.ImageBlock
    position: relative
    padding: 60px 10px 10px
    border: 2px dashed var(--color-accent)

    &__title
        width: 100%
        position: absolute
        top: 0
        text-align: center
        color: var(--color)
        font-size: 1.4em
        transition: color .5s linear

#app
    position: relative
    width: 100%
    min-height: 100vh
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background-color: var(--background-color)
    transition: background-color .5s linear
</style>
