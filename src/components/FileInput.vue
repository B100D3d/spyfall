<template lang="pug">
    div(class="file")
        input(@change="handleFileChange" :id="$vnode.key" type="file")
        label(:for="$vnode.key") {{ placeholder }}
        button {{ placeholder }}
</template>

<script>
    export default {
        name: "FileInput",
        data: () => ({
            file: undefined
        }),
        methods: {
            handleFileChange(e) {
                this.file = e.target.files[0]
            }
        },
        computed: {
            placeholder: vm => vm.file ? `${vm.file.name.slice(0, 40)}...` : "Выберите файл"
        },
        watch: {
            file() {
                const fr = new FileReader()
                fr.readAsDataURL(this.file)
                fr.onload = () => this.$emit("change", fr.result)
            }
        }
    }
</script>

<style lang="sass" scoped>
    .file
        position: relative
        max-width: 100%
        height: 50px
        margin-top: 40px

        button
            width: 100%
            height: 100%
            border: none
            padding: 10px
            font-size: 1.2em
            color: transparent
            border-radius: 10px
            transition: all .3s ease-in-out
            background: linear-gradient(45deg, var(--color-fileInput-gradient1) 40%, var(--color-fileInput-gradient2) 90%)

        input
            position: absolute
            width: 0

        label
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            cursor: pointer
            color: var(--color)
            transition: all .3s ease-in-out
            font-size: 1.2em
            text-align: center
            line-height: 50px
            z-index: 2

            &:hover
                transform: scale(1.05)

                ~ button
                    transform: scale(1.1)
                    box-shadow: 1px 2px 10px var(--color-fileInput-gradient1)
</style>