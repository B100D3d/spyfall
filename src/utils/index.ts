export const range = (from: number, to?: number, step = 1): Array<number> => {
    if (!to) {
        ;[from, to] = [0, from]
    }
    const size = to - from + 1
    return [...Array(size).keys()].map((k) => from + k * step)
}

export const removeElement = (el: Element): void => {
    if (typeof el.remove !== "undefined") {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}
