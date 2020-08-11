export const range = (from: number, to?: number, step = 1): Array<number> => {
    if (!to) {
        ;[from, to] = [0, from]
    }
    const size = to - from
    return [...Array(size).keys()].map((k) => from + k * step)
}

export const removeElement = (el: Element): void => {
    if (typeof el.remove !== "undefined") {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}

export const getDistanceFromTopOfScreen = (element: HTMLElement | null) => {
    let distance = 0
    while (element) {
        distance += element.offsetTop
        element = element.offsetParent as HTMLElement
    }

    return distance - window.scrollY
}

export const timeout = (ms: number) => new Promise((r) => setTimeout(r, ms))
