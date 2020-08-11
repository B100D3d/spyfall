<template lang="pug">
    div(class="message")
        span(class="ImageBlock__title") {{ title }}
        canvas(id="message" width="380" height="380")
        button(@click="wash")
</template>

<script>
import { getDistanceFromTopOfScreen } from "@/utils"

export default {
    name: "Paint",
    props: { title: String },
    data: () => ({
        canvas: null,
        ctx: null,
        lastMobileX: null,
        lastMobileY: null,
    }),
    mounted() {
        this.initCanvas()
    },
    methods: {
        async wash() {
            this.$el.querySelector("button").classList.add("anim")
            await new Promise((r) => setTimeout(r, 5000))
            this.$el.querySelector("button").classList.remove("anim")
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
            canvas.ontouchend = () => {
                this.lastMobileY = null
                this.lastMobileX = null
            }
        },
        draw(e) {
            e.preventDefault()
            const x =
                e.offsetX ?? e.changedTouches[0]?.clientX - e.target.offsetLeft
            const y =
                e.offsetY ??
                e.changedTouches[0]?.clientY -
                    getDistanceFromTopOfScreen(e.target)

            const dx =
                e.movementX ?? (this.lastMobileX ? x - this.lastMobileX : 0)
            const dy =
                e.movementY ?? (this.lastMobileY ? y - this.lastMobileY : 0)

            if (e.type === "touchmove") {
                this.lastMobileX = x
                this.lastMobileY = y
            }

            const { ctx } = this
            const color = Math.floor(Math.random() * 200) + 1
            ctx.strokeStyle = `rgb(${color}, ${color}, ${color})`
            if (e.buttons > 0 || e.changedTouches?.length > 0) {
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(x - dx, y - dy)
                ctx.stroke()
                ctx.closePath()
            }
        },
    },
}
</script>

<style lang="sass" scoped>

.message
    width: calc(380px + 20px)
    height: calc(380px + 70px)

    canvas
        background-color: white

    button
        position: absolute
        width: 50px
        height: 50px
        padding: 0
        top: 60px
        right: 2px
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

@media (max-width: 1010px)
    .message
        display: flex
        justify-content: center
        align-items: center
        margin: 20px 0
        width: 100%

        button
            right: calc(50% - 380px/2)
</style>
