<template lang="pug">
    button(@click="setTheme", :style="{ '--rotate': `${degree}deg` }")
</template>

<script>
export default {
    name: "ThemeButton",
    mounted() {
        this.changeHTML()
    },
    data() {
        const theme = this.getThemeFromCookie() || "dark"
        return {
            theme,
            degree: theme === "dark" ? 0 : 180,
        }
    },
    methods: {
        changeHTML() {
            document.querySelector("html").dataset.theme = this.theme
        },
        setCookie() {
            document.cookie = `theme=${this.theme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
        },
        setTheme() {
            this.theme = this.theme === "light" ? "dark" : "light"
        },
        rotateButton() {
            this.degree += 180
        },
        getThemeFromCookie: () =>
            document.cookie
                .split(";")
                .map((c) => c.trim())
                .filter((c) => c.split("=")[0] === "theme")
                .join()
                .split("=")[1],
    },
    watch: {
        theme() {
            this.rotateButton()
            this.changeHTML()
            this.setCookie()
        },
    },
}
</script>

<style lang="sass" scoped>

html[data-theme="light"]
    button
        --rotate: 180deg

button
    --rotate: 0deg
    width: 60px
    height: 60px
    padding: 0
    border: none
    cursor: pointer
    background: url("../assets/themeButton.svg") no-repeat
    background-size: cover
    transform: rotate(var(--rotate))
    transition: transform .5s ease
</style>
