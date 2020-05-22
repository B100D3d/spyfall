
export const range = (size: number, start = 0): Array<number> => {
    return [...Array(size).keys()].map(k => k + start)
}