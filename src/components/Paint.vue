<template lang="pug">
    canvas(width="400" height="400")
</template>

<script>
    export default {
        name: "Paint",
        mounted() {
            const canvas = this.$el
            const ctx = canvas.getContext("2d")

            ctx.lineCap = "round"
            ctx.lineWidth = 8
            ctx.strokeStyle = "black"

            canvas.onmousemove = e => {
                console.log(e)
                const x = e.offsetX
                const y = e.offsetY
                const dx = e.movementX
                const dy = e.movementY

                if(e.buttons > 0) {
                    ctx.beginPath()
                    ctx.moveTo(x, y)
                    ctx.lineTo(x - dx, y - dy)
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    canvas
        background-color: white
</style>