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
    @import "styles/animations"

    *
        outline: none
        box-sizing: border-box
        -webkit-tap-highlight-color: transparent
        font-family: Open Sans

    html
        font-family: Open Sans
        font-size: 16px
        --color-primary: #AAFFA9
        --color-secondary: #11FFBD
        --color-fileInput-gradient1: #00c6ff
        --color-fileInput-gradient2: #0072ff

    html[data-theme = "light"]
        --background-color: bisque
        --color: black
        --color-accent: var(--color-fileInput-gradient2)
        --color-submit-gradient1: #9D50BB
        --color-submit-gradient2: #6E48AA

    html[data-theme = "dark"]
        --background-color: #282828
        --color: white
        --color-accent: var(--color-primary)
        --color-submit-gradient1: #9D50BB
        --color-submit-gradient2: #6E48AA

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
