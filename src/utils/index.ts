
export const range = (size: number, start = 0): Array<number> => {
    return [...Array(size).keys()].map(k => k + start)
}

export const removeElement = (el: Element): void => {
    if(typeof el.remove !== "undefined") {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}