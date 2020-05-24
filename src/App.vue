<template lang="pug">
    div(id="app")
        Header
        Main
</template>

<script>
import Header from "@/components/Header"
import Main from "@/components/Main"

export default {
  name: 'App',
  components: {
      Header,
      Main
  }
}
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap')

    @import "styles/animations"
    @import "styles/variables"

    *
        outline: none
        box-sizing: border-box
        -webkit-tap-highlight-color: transparent
        font-family: 'Kosugi Maru', sans-serif

    html
        font-family: 'Kosugi Maru', sans-serif
        font-size: 16px


    body
        margin: 0

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
