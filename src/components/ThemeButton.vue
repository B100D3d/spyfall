<template lang="pug">
    button(@click="setTheme")
</template>

<script>
    export default {
        name: "ThemeButton",
        data() {
            return {
                theme: this.getThemeFromCookie() || "light"
            }
        },
        methods: {
            changeHTML() {
                document.querySelector("html").dataset.theme = this.theme
            },
            setCookie() {
                document.cookie = `theme=${ this.theme }; expires=Fri, 31 Dec 9999 23:59:59 GMT`
            },
            setTheme() {
                this.theme = this.theme === "light" ? "dark" : "light"
            },
            getThemeFromCookie: () => document.cookie
                                            .split(";")
                                            .map(c => c.trim())
                                            .filter(c => c.split("=")[0] === "theme")
                                            .join()
                                            .split("=")[1]
        },
        mounted() {
            this.changeHTML()
        },
        watch: {
            theme() {
                this.changeHTML()
                this.setCookie()
            }
        }
    }
</script>

<style lang="sass" scoped>

    button
        width: 60px
        height: 60px
        padding: 0
        border: none
        cursor: pointer
        background: url("../assets/themeButton.svg") no-repeat
        background-size: cover
        transition: transform .5s ease

    html[data-theme = "light"] button
        transform: rotate(180deg)


</style>