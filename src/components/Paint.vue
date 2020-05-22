<template lang="pug">
    div(class="message")
        canvas(id="message" width="380" height="380")
        button(@click="wash")
</template>

<script>
    export default {
        name: "Paint",
        data: () => ({
            canvas: null,
            ctx: null
        }),
        mounted() {
            this.initCanvas()
        },
        methods: {
            async wash() {
                this.$el.querySelector("button").classList.add("anim")
                await new Promise(r => setTimeout(r, 5000))
                this.$el.querySelector("button").classList.remove("anim")
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            initCanvas() {
                const canvas = this.$el.querySelector("#message")
                const ctx = canvas.getContext("2d")

                this.canvas = canvas
                this.ctx = ctx

                ctx.lineCap = "round"
                ctx.lineWidth = 8

                canvas.onmousemove = this.draw
                canvas.ontouchmove = this.draw
            },
            draw(e) {
                const x = e.offsetX
                const y = e.offsetY
                const dx = e.movementX
                const dy = e.movementY

                const { ctx } = this
                const color = Math.floor(Math.random() * 200) + 1
                ctx.strokeStyle = `rgb(${color}, ${color}, ${color})`
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

    .message
        position: relative
        width: 380px
        height: 380px

        canvas
            background-color: white

        button
            position: absolute
            width: 50px
            height: 50px
            padding: 0
            top: 0
            right: 0
            border: none
            cursor: pointer
            background: url("../assets/vacuum.svg") no-repeat
            background-size: cover

            &.anim
                animation-name: wash
                animation-duration: 5s
                animation-play-state: running


    @keyframes wash
        0%
            transform: translate(0, 0)
        25%
            transform: translate(-330px, 330px)
        50%
            transform: translate(-330px, 0)
        75%
            transform: translate(0, 330px)
        100%
            transform: translate(0, 0)

    @media (max-width: 930px)
        .message
            margin: 20px 0

</style>