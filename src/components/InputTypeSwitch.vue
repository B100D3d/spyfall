<template lang="pug">
    div(class="switchWrapper")
        input(
            type="checkbox"
            @change="$emit('change', inputModes[+$event.target.checked])"
        )
        span(class="load") Загрузить
        span(class="link") Ссылка
        div(class="slider")
</template>

<script>
export default {
    name: "InputTypeSwitch",
    data: () => ({ inputModes: ["Load", "Ref"] }),
}
</script>

<style lang="sass" scoped>

.switchWrapper
    position: relative
    display: flex
    justify-content: space-between
    align-items: center
    width: 250px
    height: 50px
    font-size: 1.1em

    .slider
        position: absolute
        top: calc(10% - 2px)
        left: 0
        width: 50%
        height: 85%
        background: linear-gradient(45deg, var(--temp-primary), var(--temp-secondary))
        transform: skewY(30deg) rotate(-30deg)
        border-radius: 10px
        transition: all .5s ease, --temp-primary .3s linear, --temp-secondary .3s linear

    span
        z-index: 5
        transition: color .5s linear

    .load
        margin-left: 22px
        color: black

    .link
        margin-right: 32px
        color: var(--color)

    input
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        margin: 0
        padding: 0
        opacity: 0
        cursor: pointer
        z-index: 10

        &:hover
            ~ .slider
                box-shadow: 2px 4px 10px var(--color-primary)
                --temp-primary: var(--color-secondary)
                --temp-secondary: var(--color-primary)

        &:checked
            ~ .slider
                left: 50%
                transform: skewY(-30deg) rotate(30deg)

            ~ .link
                color: black
            ~ .load
                color: var(--color)
</style>
