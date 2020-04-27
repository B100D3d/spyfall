<template lang="pug">
    div(id="app")
        ThemeButton
</template>

<script>
import ThemeButton from "@/components/ThemeButton"

export default {
  name: 'App',
  components: {
      ThemeButton
  }
}
</script>

<style lang="sass">
    *
        outline: none
        box-sizing: border-box
        -webkit-tap-highlight-color: transparent

    html
        font-family: Open Sans sans-serif

    html[data-theme = "light"]
        --background-color: bisque
        --color: black

    html[data-theme = "dark"]
        --background-color: #282828
        --color: white

    body
        margin: 0

    #app
        width: 100%
        height: 100vh
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        background-color: var(--background-color)
        transition: background-color .5s linear
</style>
